import NewModelForm from "@/components/forms/new-model/new-model.form";

export default async function NewModelPage() {
    return (
        <section className="flex size-full flex-col">
            <NewModelForm showAbout />
        </section>
    );
}
