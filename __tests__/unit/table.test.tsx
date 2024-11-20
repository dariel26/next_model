import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { GenericTable } from "@/components/tables/generic/generic-table";
import { columns, Payment } from "@/components/tables/generic/columns";

const tableData: Payment[] = [
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

describe("GenericTable Component", () => {
    it("should show all data rows", async () => {
        render(<GenericTable columns={columns} data={tableData} />);

        const dateHead = screen.getByText("Date");

        await expect(dateHead).toBeInTheDocument();
    });
});
