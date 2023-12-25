"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientColumn = {
  id: string
  title: string
  trainer: string
  startDate: string
  endDate: string
  createdAt: string
  createdBy: string
  updatedBy: string
}

export const Columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "trainer",
    header: "Trainer",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "createdBy",
    header: "Created by"
  },
  {
    accessorKey: "updatedBy",
    header: "Updated by",
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
