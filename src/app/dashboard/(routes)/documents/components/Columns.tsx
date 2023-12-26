"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientColumn = {
  id: string
  title: string
  url: string
  training: string
  createdBy: string
  updatedAt: string
}

export const Columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'training',
    header: 'Training',
  },
  {
    accessorKey: 'createdBy',
    header: 'Created By',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
