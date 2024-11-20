import DefaultLayout from "@/components/layouts/default-layout";
import { GenericTable } from "@/components/tables/generic/generic-table";
import { Payment, columns } from "@/components/tables/generic/columns";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
            date: new Date(),
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
            date: new Date(),
        },
    ];
}

export default async function SchedulePage() {
    const data = await getData();

    return (
        <DefaultLayout title="Table">
            <GenericTable columns={columns} data={data} />
        </DefaultLayout>
    );
}
