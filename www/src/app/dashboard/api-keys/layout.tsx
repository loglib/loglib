

export default function APIKeysLayout({ children }) {
    return (
        <section className=" space-y-8">
            <div className="grid gap-1">
                <h1 className="font-heading text-3xl md:text-4xl">API Keys</h1>
                <p className="text-lg text-muted-foreground">Manage your api keys</p>
            </div>
            {children}
        </section>

    )
}