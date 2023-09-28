# Clickhouse for loglib

Make sure to add this to /etc/clickhouse-server/config.d/kafka.xml before running migration.

```text
 <clickhouse>
   <kafka>
       <sasl_username></sasl_username>
       <sasl_password></sasl_password>
       <security_protocol>sasl_ssl</security_protocol>
       <sasl_mechanisms>SCRAM-SHA-256</sasl_mechanisms>
   </kafka>
</clickhouse>
```
