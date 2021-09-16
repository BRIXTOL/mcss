/* eslint-disable */

import { Selectors } from "@brixtol/mcss";

export type ClassNames = Array<
  | "container"
  | "container-fluid"
  | "container-sm"
  | "container-md"
  | "container-lg"
  | "container-xl"
  | "row"
  | "no-gutters"
  | "col"
  | "col-1"
  | "col-2"
  | "col-3"
  | "col-4"
  | "col-5"
  | "col-6"
  | "col-7"
  | "col-8"
  | "col-9"
  | "col-10"
  | "col-11"
  | "col-12"
  | "col-auto"
  | "col-sm-1"
  | "col-sm-2"
  | "col-sm-3"
  | "col-sm-4"
  | "col-sm-5"
  | "col-sm-6"
  | "col-sm-7"
  | "col-sm-8"
  | "col-sm-9"
  | "col-sm-10"
  | "col-sm-11"
  | "col-sm-12"
  | "col-sm"
  | "col-sm-auto"
  | "col-md-1"
  | "col-md-2"
  | "col-md-3"
  | "col-md-4"
  | "col-md-5"
  | "col-md-6"
  | "col-md-7"
  | "col-md-8"
  | "col-md-9"
  | "col-md-10"
  | "col-md-11"
  | "col-md-12"
  | "col-md"
  | "col-md-auto"
  | "col-lg-1"
  | "col-lg-2"
  | "col-lg-3"
  | "col-lg-4"
  | "col-lg-5"
  | "col-lg-6"
  | "col-lg-7"
  | "col-lg-8"
  | "col-lg-9"
  | "col-lg-10"
  | "col-lg-11"
  | "col-lg-12"
  | "col-lg"
  | "col-lg-auto"
  | "col-xl-1"
  | "col-xl-2"
  | "col-xl-3"
  | "col-xl-4"
  | "col-xl-5"
  | "col-xl-6"
  | "col-xl-7"
  | "col-xl-8"
  | "col-xl-9"
  | "col-xl-10"
  | "col-xl-11"
  | "col-xl-12"
  | "col-xl"
  | "col-xl-auto"
  | "row-cols-1"
  | "row-cols-2"
  | "row-cols-3"
  | "row-cols-4"
  | "row-cols-5"
  | "row-cols-6"
  | "order-first"
  | "order-last"
  | "order-0"
  | "order-1"
  | "order-2"
  | "order-3"
  | "order-4"
  | "order-5"
  | "order-6"
  | "order-7"
  | "order-8"
  | "order-9"
  | "order-10"
  | "order-11"
  | "order-12"
  | "offset-1"
  | "offset-2"
  | "offset-3"
  | "offset-4"
  | "offset-5"
  | "offset-6"
  | "offset-7"
  | "offset-8"
  | "offset-9"
  | "offset-10"
  | "offset-11"
  | "row-cols-sm-1"
  | "row-cols-sm-2"
  | "row-cols-sm-3"
  | "row-cols-sm-4"
  | "row-cols-sm-5"
  | "row-cols-sm-6"
  | "order-sm-first"
  | "order-sm-last"
  | "order-sm-0"
  | "order-sm-1"
  | "order-sm-2"
  | "order-sm-3"
  | "order-sm-4"
  | "order-sm-5"
  | "order-sm-6"
  | "order-sm-7"
  | "order-sm-8"
  | "order-sm-9"
  | "order-sm-10"
  | "order-sm-11"
  | "order-sm-12"
  | "offset-sm-0"
  | "offset-sm-1"
  | "offset-sm-2"
  | "offset-sm-3"
  | "offset-sm-4"
  | "offset-sm-5"
  | "offset-sm-6"
  | "offset-sm-7"
  | "offset-sm-8"
  | "offset-sm-9"
  | "offset-sm-10"
  | "offset-sm-11"
  | "row-cols-md-1"
  | "row-cols-md-2"
  | "row-cols-md-3"
  | "row-cols-md-4"
  | "row-cols-md-5"
  | "row-cols-md-6"
  | "order-md-first"
  | "order-md-last"
  | "order-md-0"
  | "order-md-1"
  | "order-md-2"
  | "order-md-3"
  | "order-md-4"
  | "order-md-5"
  | "order-md-6"
  | "order-md-7"
  | "order-md-8"
  | "order-md-9"
  | "order-md-10"
  | "order-md-11"
  | "order-md-12"
  | "offset-md-0"
  | "offset-md-1"
  | "offset-md-2"
  | "offset-md-3"
  | "offset-md-4"
  | "offset-md-5"
  | "offset-md-6"
  | "offset-md-7"
  | "offset-md-8"
  | "offset-md-9"
  | "offset-md-10"
  | "offset-md-11"
  | "row-cols-lg-1"
  | "row-cols-lg-2"
  | "row-cols-lg-3"
  | "row-cols-lg-4"
  | "row-cols-lg-5"
  | "row-cols-lg-6"
  | "order-lg-first"
  | "order-lg-last"
  | "order-lg-0"
  | "order-lg-1"
  | "order-lg-2"
  | "order-lg-3"
  | "order-lg-4"
  | "order-lg-5"
  | "order-lg-6"
  | "order-lg-7"
  | "order-lg-8"
  | "order-lg-9"
  | "order-lg-10"
  | "order-lg-11"
  | "order-lg-12"
  | "offset-lg-0"
  | "offset-lg-1"
  | "offset-lg-2"
  | "offset-lg-3"
  | "offset-lg-4"
  | "offset-lg-5"
  | "offset-lg-6"
  | "offset-lg-7"
  | "offset-lg-8"
  | "offset-lg-9"
  | "offset-lg-10"
  | "offset-lg-11"
  | "row-cols-xl-1"
  | "row-cols-xl-2"
  | "row-cols-xl-3"
  | "row-cols-xl-4"
  | "row-cols-xl-5"
  | "row-cols-xl-6"
  | "order-xl-first"
  | "order-xl-last"
  | "order-xl-0"
  | "order-xl-1"
  | "order-xl-2"
  | "order-xl-3"
  | "order-xl-4"
  | "order-xl-5"
  | "order-xl-6"
  | "order-xl-7"
  | "order-xl-8"
  | "order-xl-9"
  | "order-xl-10"
  | "order-xl-11"
  | "order-xl-12"
  | "offset-xl-0"
  | "offset-xl-1"
  | "offset-xl-2"
  | "offset-xl-3"
  | "offset-xl-4"
  | "offset-xl-5"
  | "offset-xl-6"
  | "offset-xl-7"
  | "offset-xl-8"
  | "offset-xl-9"
  | "offset-xl-10"
  | "offset-xl-11"
  | "align-baseline"
  | "align-top"
  | "align-middle"
  | "align-bottom"
  | "align-text-bottom"
  | "align-text-top"
  | "d-none"
  | "d-inline"
  | "d-inline-block"
  | "d-block"
  | "d-table"
  | "d-table-row"
  | "d-table-cell"
  | "d-flex"
  | "d-inline-flex"
  | "d-sm-none"
  | "d-sm-inline"
  | "d-sm-inline-block"
  | "d-sm-block"
  | "d-sm-table"
  | "d-sm-table-row"
  | "d-sm-table-cell"
  | "d-sm-flex"
  | "d-sm-inline-flex"
  | "d-md-none"
  | "d-md-inline"
  | "d-md-inline-block"
  | "d-md-block"
  | "d-md-table"
  | "d-md-table-row"
  | "d-md-table-cell"
  | "d-md-flex"
  | "d-md-inline-flex"
  | "d-lg-none"
  | "d-lg-inline"
  | "d-lg-inline-block"
  | "d-lg-block"
  | "d-lg-table"
  | "d-lg-table-row"
  | "d-lg-table-cell"
  | "d-lg-flex"
  | "d-lg-inline-flex"
  | "d-xl-none"
  | "d-xl-inline"
  | "d-xl-inline-block"
  | "d-xl-block"
  | "d-xl-table"
  | "d-xl-table-row"
  | "d-xl-table-cell"
  | "d-xl-flex"
  | "d-xl-inline-flex"
  | "d-print-none"
  | "d-print-inline"
  | "d-print-inline-block"
  | "d-print-block"
  | "d-print-table"
  | "d-print-table-row"
  | "d-print-table-cell"
  | "d-print-flex"
  | "d-print-inline-flex"
  | "m-0"
  | "mt-0"
  | "my-0"
  | "mr-0"
  | "mx-0"
  | "mb-0"
  | "ml-0"
  | "m-1"
  | "mt-1"
  | "my-1"
  | "mr-1"
  | "mx-1"
  | "mb-1"
  | "ml-1"
  | "m-2"
  | "mt-2"
  | "my-2"
  | "mr-2"
  | "mx-2"
  | "mb-2"
  | "ml-2"
  | "m-3"
  | "mt-3"
  | "my-3"
  | "mr-3"
  | "mx-3"
  | "mb-3"
  | "ml-3"
  | "m-4"
  | "mt-4"
  | "my-4"
  | "mr-4"
  | "mx-4"
  | "mb-4"
  | "ml-4"
  | "m-5"
  | "mt-5"
  | "my-5"
  | "mr-5"
  | "mx-5"
  | "mb-5"
  | "ml-5"
  | "p-0"
  | "pt-0"
  | "py-0"
  | "pr-0"
  | "px-0"
  | "pb-0"
  | "pl-0"
  | "p-1"
  | "pt-1"
  | "py-1"
  | "pr-1"
  | "px-1"
  | "pb-1"
  | "pl-1"
  | "p-2"
  | "pt-2"
  | "py-2"
  | "pr-2"
  | "px-2"
  | "pb-2"
  | "pl-2"
  | "p-3"
  | "pt-3"
  | "py-3"
  | "pr-3"
  | "px-3"
  | "pb-3"
  | "pl-3"
  | "p-4"
  | "pt-4"
  | "py-4"
  | "pr-4"
  | "px-4"
  | "pb-4"
  | "pl-4"
  | "p-5"
  | "pt-5"
  | "py-5"
  | "pr-5"
  | "px-5"
  | "pb-5"
  | "pl-5"
  | "m-n1"
  | "mt-n1"
  | "my-n1"
  | "mr-n1"
  | "mx-n1"
  | "mb-n1"
  | "ml-n1"
  | "m-n2"
  | "mt-n2"
  | "my-n2"
  | "mr-n2"
  | "mx-n2"
  | "mb-n2"
  | "ml-n2"
  | "m-n3"
  | "mt-n3"
  | "my-n3"
  | "mr-n3"
  | "mx-n3"
  | "mb-n3"
  | "ml-n3"
  | "m-n4"
  | "mt-n4"
  | "my-n4"
  | "mr-n4"
  | "mx-n4"
  | "mb-n4"
  | "ml-n4"
  | "m-n5"
  | "mt-n5"
  | "my-n5"
  | "mr-n5"
  | "mx-n5"
  | "mb-n5"
  | "ml-n5"
  | "m-auto"
  | "mt-auto"
  | "my-auto"
  | "mr-auto"
  | "mx-auto"
  | "mb-auto"
  | "ml-auto"
  | "m-sm-0"
  | "mt-sm-0"
  | "my-sm-0"
  | "mr-sm-0"
  | "mx-sm-0"
  | "mb-sm-0"
  | "ml-sm-0"
  | "m-sm-1"
  | "mt-sm-1"
  | "my-sm-1"
  | "mr-sm-1"
  | "mx-sm-1"
  | "mb-sm-1"
  | "ml-sm-1"
  | "m-sm-2"
  | "mt-sm-2"
  | "my-sm-2"
  | "mr-sm-2"
  | "mx-sm-2"
  | "mb-sm-2"
  | "ml-sm-2"
  | "m-sm-3"
  | "mt-sm-3"
  | "my-sm-3"
  | "mr-sm-3"
  | "mx-sm-3"
  | "mb-sm-3"
  | "ml-sm-3"
  | "m-sm-4"
  | "mt-sm-4"
  | "my-sm-4"
  | "mr-sm-4"
  | "mx-sm-4"
  | "mb-sm-4"
  | "ml-sm-4"
  | "m-sm-5"
  | "mt-sm-5"
  | "my-sm-5"
  | "mr-sm-5"
  | "mx-sm-5"
  | "mb-sm-5"
  | "ml-sm-5"
  | "p-sm-0"
  | "pt-sm-0"
  | "py-sm-0"
  | "pr-sm-0"
  | "px-sm-0"
  | "pb-sm-0"
  | "pl-sm-0"
  | "p-sm-1"
  | "pt-sm-1"
  | "py-sm-1"
  | "pr-sm-1"
  | "px-sm-1"
  | "pb-sm-1"
  | "pl-sm-1"
  | "p-sm-2"
  | "pt-sm-2"
  | "py-sm-2"
  | "pr-sm-2"
  | "px-sm-2"
  | "pb-sm-2"
  | "pl-sm-2"
  | "p-sm-3"
  | "pt-sm-3"
  | "py-sm-3"
  | "pr-sm-3"
  | "px-sm-3"
  | "pb-sm-3"
  | "pl-sm-3"
  | "p-sm-4"
  | "pt-sm-4"
  | "py-sm-4"
  | "pr-sm-4"
  | "px-sm-4"
  | "pb-sm-4"
  | "pl-sm-4"
  | "p-sm-5"
  | "pt-sm-5"
  | "py-sm-5"
  | "pr-sm-5"
  | "px-sm-5"
  | "pb-sm-5"
  | "pl-sm-5"
  | "m-sm-n1"
  | "mt-sm-n1"
  | "my-sm-n1"
  | "mr-sm-n1"
  | "mx-sm-n1"
  | "mb-sm-n1"
  | "ml-sm-n1"
  | "m-sm-n2"
  | "mt-sm-n2"
  | "my-sm-n2"
  | "mr-sm-n2"
  | "mx-sm-n2"
  | "mb-sm-n2"
  | "ml-sm-n2"
  | "m-sm-n3"
  | "mt-sm-n3"
  | "my-sm-n3"
  | "mr-sm-n3"
  | "mx-sm-n3"
  | "mb-sm-n3"
  | "ml-sm-n3"
  | "m-sm-n4"
  | "mt-sm-n4"
  | "my-sm-n4"
  | "mr-sm-n4"
  | "mx-sm-n4"
  | "mb-sm-n4"
  | "ml-sm-n4"
  | "m-sm-n5"
  | "mt-sm-n5"
  | "my-sm-n5"
  | "mr-sm-n5"
  | "mx-sm-n5"
  | "mb-sm-n5"
  | "ml-sm-n5"
  | "m-sm-auto"
  | "mt-sm-auto"
  | "my-sm-auto"
  | "mr-sm-auto"
  | "mx-sm-auto"
  | "mb-sm-auto"
  | "ml-sm-auto"
  | "m-md-0"
  | "mt-md-0"
  | "my-md-0"
  | "mr-md-0"
  | "mx-md-0"
  | "mb-md-0"
  | "ml-md-0"
  | "m-md-1"
  | "mt-md-1"
  | "my-md-1"
  | "mr-md-1"
  | "mx-md-1"
  | "mb-md-1"
  | "ml-md-1"
  | "m-md-2"
  | "mt-md-2"
  | "my-md-2"
  | "mr-md-2"
  | "mx-md-2"
  | "mb-md-2"
  | "ml-md-2"
  | "m-md-3"
  | "mt-md-3"
  | "my-md-3"
  | "mr-md-3"
  | "mx-md-3"
  | "mb-md-3"
  | "ml-md-3"
  | "m-md-4"
  | "mt-md-4"
  | "my-md-4"
  | "mr-md-4"
  | "mx-md-4"
  | "mb-md-4"
  | "ml-md-4"
  | "m-md-5"
  | "mt-md-5"
  | "my-md-5"
  | "mr-md-5"
  | "mx-md-5"
  | "mb-md-5"
  | "ml-md-5"
  | "p-md-0"
  | "pt-md-0"
  | "py-md-0"
  | "pr-md-0"
  | "px-md-0"
  | "pb-md-0"
  | "pl-md-0"
  | "p-md-1"
  | "pt-md-1"
  | "py-md-1"
  | "pr-md-1"
  | "px-md-1"
  | "pb-md-1"
  | "pl-md-1"
  | "p-md-2"
  | "pt-md-2"
  | "py-md-2"
  | "pr-md-2"
  | "px-md-2"
  | "pb-md-2"
  | "pl-md-2"
  | "p-md-3"
  | "pt-md-3"
  | "py-md-3"
  | "pr-md-3"
  | "px-md-3"
  | "pb-md-3"
  | "pl-md-3"
  | "p-md-4"
  | "pt-md-4"
  | "py-md-4"
  | "pr-md-4"
  | "px-md-4"
  | "pb-md-4"
  | "pl-md-4"
  | "p-md-5"
  | "pt-md-5"
  | "py-md-5"
  | "pr-md-5"
  | "px-md-5"
  | "pb-md-5"
  | "pl-md-5"
  | "m-md-n1"
  | "mt-md-n1"
  | "my-md-n1"
  | "mr-md-n1"
  | "mx-md-n1"
  | "mb-md-n1"
  | "ml-md-n1"
  | "m-md-n2"
  | "mt-md-n2"
  | "my-md-n2"
  | "mr-md-n2"
  | "mx-md-n2"
  | "mb-md-n2"
  | "ml-md-n2"
  | "m-md-n3"
  | "mt-md-n3"
  | "my-md-n3"
  | "mr-md-n3"
  | "mx-md-n3"
  | "mb-md-n3"
  | "ml-md-n3"
  | "m-md-n4"
  | "mt-md-n4"
  | "my-md-n4"
  | "mr-md-n4"
  | "mx-md-n4"
  | "mb-md-n4"
  | "ml-md-n4"
  | "m-md-n5"
  | "mt-md-n5"
  | "my-md-n5"
  | "mr-md-n5"
  | "mx-md-n5"
  | "mb-md-n5"
  | "ml-md-n5"
  | "m-md-auto"
  | "mt-md-auto"
  | "my-md-auto"
  | "mr-md-auto"
  | "mx-md-auto"
  | "mb-md-auto"
  | "ml-md-auto"
  | "m-lg-0"
  | "mt-lg-0"
  | "my-lg-0"
  | "mr-lg-0"
  | "mx-lg-0"
  | "mb-lg-0"
  | "ml-lg-0"
  | "m-lg-1"
  | "mt-lg-1"
  | "my-lg-1"
  | "mr-lg-1"
  | "mx-lg-1"
  | "mb-lg-1"
  | "ml-lg-1"
  | "m-lg-2"
  | "mt-lg-2"
  | "my-lg-2"
  | "mr-lg-2"
  | "mx-lg-2"
  | "mb-lg-2"
  | "ml-lg-2"
  | "m-lg-3"
  | "mt-lg-3"
  | "my-lg-3"
  | "mr-lg-3"
  | "mx-lg-3"
  | "mb-lg-3"
  | "ml-lg-3"
  | "m-lg-4"
  | "mt-lg-4"
  | "my-lg-4"
  | "mr-lg-4"
  | "mx-lg-4"
  | "mb-lg-4"
  | "ml-lg-4"
  | "m-lg-5"
  | "mt-lg-5"
  | "my-lg-5"
  | "mr-lg-5"
  | "mx-lg-5"
  | "mb-lg-5"
  | "ml-lg-5"
  | "p-lg-0"
  | "pt-lg-0"
  | "py-lg-0"
  | "pr-lg-0"
  | "px-lg-0"
  | "pb-lg-0"
  | "pl-lg-0"
  | "p-lg-1"
  | "pt-lg-1"
  | "py-lg-1"
  | "pr-lg-1"
  | "px-lg-1"
  | "pb-lg-1"
  | "pl-lg-1"
  | "p-lg-2"
  | "pt-lg-2"
  | "py-lg-2"
  | "pr-lg-2"
  | "px-lg-2"
  | "pb-lg-2"
  | "pl-lg-2"
  | "p-lg-3"
  | "pt-lg-3"
  | "py-lg-3"
  | "pr-lg-3"
  | "px-lg-3"
  | "pb-lg-3"
  | "pl-lg-3"
  | "p-lg-4"
  | "pt-lg-4"
  | "py-lg-4"
  | "pr-lg-4"
  | "px-lg-4"
  | "pb-lg-4"
  | "pl-lg-4"
  | "p-lg-5"
  | "pt-lg-5"
  | "py-lg-5"
  | "pr-lg-5"
  | "px-lg-5"
  | "pb-lg-5"
  | "pl-lg-5"
  | "m-lg-n1"
  | "mt-lg-n1"
  | "my-lg-n1"
  | "mr-lg-n1"
  | "mx-lg-n1"
  | "mb-lg-n1"
  | "ml-lg-n1"
  | "m-lg-n2"
  | "mt-lg-n2"
  | "my-lg-n2"
  | "mr-lg-n2"
  | "mx-lg-n2"
  | "mb-lg-n2"
  | "ml-lg-n2"
  | "m-lg-n3"
  | "mt-lg-n3"
  | "my-lg-n3"
  | "mr-lg-n3"
  | "mx-lg-n3"
  | "mb-lg-n3"
  | "ml-lg-n3"
  | "m-lg-n4"
  | "mt-lg-n4"
  | "my-lg-n4"
  | "mr-lg-n4"
  | "mx-lg-n4"
  | "mb-lg-n4"
  | "ml-lg-n4"
  | "m-lg-n5"
  | "mt-lg-n5"
  | "my-lg-n5"
  | "mr-lg-n5"
  | "mx-lg-n5"
  | "mb-lg-n5"
  | "ml-lg-n5"
  | "m-lg-auto"
  | "mt-lg-auto"
  | "my-lg-auto"
  | "mr-lg-auto"
  | "mx-lg-auto"
  | "mb-lg-auto"
  | "ml-lg-auto"
  | "m-xl-0"
  | "mt-xl-0"
  | "my-xl-0"
  | "mr-xl-0"
  | "mx-xl-0"
  | "mb-xl-0"
  | "ml-xl-0"
  | "m-xl-1"
  | "mt-xl-1"
  | "my-xl-1"
  | "mr-xl-1"
  | "mx-xl-1"
  | "mb-xl-1"
  | "ml-xl-1"
  | "m-xl-2"
  | "mt-xl-2"
  | "my-xl-2"
  | "mr-xl-2"
  | "mx-xl-2"
  | "mb-xl-2"
  | "ml-xl-2"
  | "m-xl-3"
  | "mt-xl-3"
  | "my-xl-3"
  | "mr-xl-3"
  | "mx-xl-3"
  | "mb-xl-3"
  | "ml-xl-3"
  | "m-xl-4"
  | "mt-xl-4"
  | "my-xl-4"
  | "mr-xl-4"
  | "mx-xl-4"
  | "mb-xl-4"
  | "ml-xl-4"
  | "m-xl-5"
  | "mt-xl-5"
  | "my-xl-5"
  | "mr-xl-5"
  | "mx-xl-5"
  | "mb-xl-5"
  | "ml-xl-5"
  | "p-xl-0"
  | "pt-xl-0"
  | "py-xl-0"
  | "pr-xl-0"
  | "px-xl-0"
  | "pb-xl-0"
  | "pl-xl-0"
  | "p-xl-1"
  | "pt-xl-1"
  | "py-xl-1"
  | "pr-xl-1"
  | "px-xl-1"
  | "pb-xl-1"
  | "pl-xl-1"
  | "p-xl-2"
  | "pt-xl-2"
  | "py-xl-2"
  | "pr-xl-2"
  | "px-xl-2"
  | "pb-xl-2"
  | "pl-xl-2"
  | "p-xl-3"
  | "pt-xl-3"
  | "py-xl-3"
  | "pr-xl-3"
  | "px-xl-3"
  | "pb-xl-3"
  | "pl-xl-3"
  | "p-xl-4"
  | "pt-xl-4"
  | "py-xl-4"
  | "pr-xl-4"
  | "px-xl-4"
  | "pb-xl-4"
  | "pl-xl-4"
  | "p-xl-5"
  | "pt-xl-5"
  | "py-xl-5"
  | "pr-xl-5"
  | "px-xl-5"
  | "pb-xl-5"
  | "pl-xl-5"
  | "m-xl-n1"
  | "mt-xl-n1"
  | "my-xl-n1"
  | "mr-xl-n1"
  | "mx-xl-n1"
  | "mb-xl-n1"
  | "ml-xl-n1"
  | "m-xl-n2"
  | "mt-xl-n2"
  | "my-xl-n2"
  | "mr-xl-n2"
  | "mx-xl-n2"
  | "mb-xl-n2"
  | "ml-xl-n2"
  | "m-xl-n3"
  | "mt-xl-n3"
  | "my-xl-n3"
  | "mr-xl-n3"
  | "mx-xl-n3"
  | "mb-xl-n3"
  | "ml-xl-n3"
  | "m-xl-n4"
  | "mt-xl-n4"
  | "my-xl-n4"
  | "mr-xl-n4"
  | "mx-xl-n4"
  | "mb-xl-n4"
  | "ml-xl-n4"
  | "m-xl-n5"
  | "mt-xl-n5"
  | "my-xl-n5"
  | "mr-xl-n5"
  | "mx-xl-n5"
  | "mb-xl-n5"
  | "ml-xl-n5"
  | "m-xl-auto"
  | "mt-xl-auto"
  | "my-xl-auto"
  | "mr-xl-auto"
  | "mx-xl-auto"
  | "mb-xl-auto"
  | "ml-xl-auto"
  | "foo"
  | "goo"
  | "sa"
  >;

declare module "mithril" {
  export interface Static { css: Selectors<ClassNames> }
}