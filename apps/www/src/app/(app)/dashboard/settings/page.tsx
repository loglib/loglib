import { Card } from "@/components/ui/card";

const setting = () => {
    return (
        <section className=" space-y-8">
            <div className="grid gap-1">
                <h1 className="font-heading text-3xl md:text-4xl">Setting</h1>
                <p className="text-muted-foreground text-lg">Manage your account settings</p>
            </div>
            <Card></Card>
        </section>
    );
};
export default setting;
