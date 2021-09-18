/* eslint-disable */

import { Selectors } from "../../package/types/mithril";

export type ClassNames = Array<
  | "foo"
  | "bar"
  | "baz"
>;

declare module "mithril" {
  interface Static { css: Selectors<ClassNames> }
}
