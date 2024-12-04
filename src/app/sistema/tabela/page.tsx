import DefaultLayout from "@/components/layouts/default-layout";
import { GenericTable } from "@/components/tables/generic/generic-table";
import { GenericColumn, GenericColumnType } from "@/components/tables/generic/types/index.dt";

async function getData() {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
            date: new Date(),
            scheduled: true,
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
            date: new Date(),
            scheduled: false,
        },
    ];
}

export default async function TablePage() {
    const data = await getData();
    const genericColumns: GenericColumn[] = [
        { columnType: GenericColumnType.NUMBER, accessorKey: "amount", label: "Amount" },
        { columnType: GenericColumnType.STRING, accessorKey: "status", label: "Status" },
        { columnType: GenericColumnType.DATE, accessorKey: "date", label: "Date" },
        { columnType: GenericColumnType.BOOLEAN, accessorKey: "scheduled", label: "Scheduled" },
        { columnType: GenericColumnType.STRING, accessorKey: "email", label: "E-mail" },
    ];

    return (
        <DefaultLayout title="Table">
            <GenericTable genericColumns={genericColumns} data={data} />
        </DefaultLayout>
    );
}
