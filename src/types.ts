import m from 'mithril';

/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

/**
 * Tag Selectors
 */
export interface FugaziSelectors extends HTMLElementTagNameMap {
  /**
   * Renders a space separated string
   *
   * @example
   * m.class('foo', 'bar') // => 'foo bar'
   * m.class(['foo', 'bar']) // => 'foo bar'
   */
  class: any;
  /**
   * Renders as dot separated string
   *
   * @example
   * m(m.css('foo', 'bar')) // => m('.foo.bar')
   * m(m.css(['foo', 'bar'])) // => m('.foo.bar')
   */
  css: any;
  svg: any;
}

export declare type Fugazi<T extends unknown[]> = {
  [K in keyof FugaziSelectors]: K extends 'class'
  ? {
    /**
     * Class name array
     *
     * @example
     *
     * // Selector Completions
     * m.class(['foo', 'bar'])() // => 'foo bar'
     */
    (selector: T): string
    /**
     * Class spread
     *
     * @example
     *
     * // Selector Completions
     * m.class('foo', 'bar')() // => 'foo bar'
     */
    (...selector: T): string
  } : K extends 'css'
  ? {
    /**
     * Selector drop-in array
     *
     * @example
     *
     * // Selector Completions
     * m(m.css(['foo', 'bar']), 'hello world') // => m('.foo.bar', 'hello world')
     */
    (selector: T): string
    /**
     * Selector drop-in spread
     *
     * @example
     *
     * // Selector Completions
     * m(m.css('foo', 'bar'), 'hello world') // => m('.foo.bar', 'hello world')
     */
    (...selector: T): string
  }
  : {
    /**
     * Vnode as curried fugazi
     *
     * @example
     *
     * // Selector Completions
     * m.div('foo', 'bar')() // => m('.foo.bar')
     *
     * // Omitted Selector
     * m.div({ onclick: (e) => e }) // => m('div', { onclick: (e) => e })
     *
     * // Direct Value
     * m.p('hello world') // => m('p', 'hello world')
     *
     * // Children
     * m.ul([ m.li('foo') ]) // => m('ul', [ m('li', 'foo')])
     */
    (...selector: T): {
      /**
       * Curried to children
       */
      (...children: m.Children[]): m.Vnode<any, any>;
      /**
       * Curried to attibutes
       */
      (attributes: m.Attributes, ...children: m.Children[]): m.Vnode<any, any>
    };
    /**
     * Vnode tag with string selector.
     *
     * > _This approach does not support class name completion_
     *
     * @example
     *
     * // Selector Completions
     * m.div('.foo.bar', { id: 'baz'}, 'hello') // => m('.foo.bar', { id: 'baz'}, 'hello')
     */
    (
      selector: string,
      attributes?: m.Attributes,
      ...children: m.Children[]
    ): m.Vnode<any, any>;
    /**
     * Vnode tag omitted selector
     *
     * @example
     *
     * // Selector Completions
     * m.div({ id: 'baz'}, 'hello') // => m({ id: 'baz'}, 'hello')
     */
    (
      attributes?: m.Attributes,
      ...children: m.Children[]
    ): m.Vnode<any, any>;
  }
}
