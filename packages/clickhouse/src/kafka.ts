import { Kafka, Producer, RecordMetadata } from "kafkajs";
import { KAFKA, KAFKA_PRODUCER } from "./lib/constants";

let kafka: Kafka;
let producer: Producer;
const enabled = Boolean(process.env.KAFKA_USERNAME && process.env.KAFKA_BROKER);

function getClient() {
    const username = process.env.KAFKA_USERNAME as string;
    const password = process.env.KAFKA_PASSWORD as string;
    const brokers = process.env.KAFKA_BROKER ? process.env.KAFKA_BROKER.split(",") : [];
    const ssl = process.env.CA_CERT
        ? {
              ca: process.env.CA_CERT,
              key: process.env.CLIENT_KEY,
              cert: process.env.CLIENT_CERT,
          }
        : null;
    const kafka = new Kafka({
        brokers,
        sasl: {
            mechanism: "scram-sha-256",
            username,
            password,
        },
        ssl: ssl ?? true,
    });
    if (process.env.NODE_ENV !== "production") {
        global[KAFKA] = kafka;
    }
    return kafka;
}

async function sendMessage(
    message: { [key: string]: string | number },
    topic: string,
): Promise<RecordMetadata[]> {
    const p = await getProducer();
    return p.send({
        topic,
        messages: [
            {
                value: JSON.stringify(message),
            },
        ],
        acks: -1,
    });
}

async function sendMessages(messages: { [key: string]: string | number }[], topic: string) {
    const p = await getProducer();
    await p.send({
        topic,
        messages: messages.map((a) => {
            return { value: JSON.stringify(a) };
        }),
        acks: 1,
    });
}

async function getProducer(): Promise<Producer> {
    const k = kafka || getClient();
    const producer = k.producer();
    await producer.connect();
    console.log("Kafka producer initialized");
    return producer;
}

async function connect(): Promise<Kafka> {
    if (!kafka) {
        kafka =
            process.env.KAFKA_USERNAME && process.env.KAFKA_BROKER
                ? global[KAFKA] || getClient()
                : null;
        if (kafka) {
            producer = global[KAFKA_PRODUCER] || (await getProducer());
        }
    }
    return kafka;
}

export default {
    enabled,
    client: kafka,
    producer,
    connect,
    sendMessage,
    sendMessages,
};
