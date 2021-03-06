/* eslint-disable */
import { Fugazi } from "@brixtol/mcss";

/**
 * CSS Class Selectors 
 * 
 * Last Modified: 2021-10-01T03:20:27.157Z
 */
declare type Selectors = Array<
  | "list"
  | "some-class-in-test-3"
  | "some-other-class-in-test-3"
>;

declare module "mithril" { interface Static extends Fugazi<Selectors> {} }