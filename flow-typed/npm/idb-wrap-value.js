// @flow

/**
 * Flowtype definitions for wrap-idb-value.ts
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.9.2
 */

import {
  IDBPCursor,
  IDBPCursorWithValue,
  IDBPDatabase,
  IDBPIndex,
  IDBPObjectStore,
  IDBPTransaction
} from "./idb";

import { Constructor, Func, instanceOfAny } from "./idb-util";
declare var idbProxyableTypes: Constructor[];
declare var cursorAdvanceMethods: Func[];
declare function getIdbProxyableTypes(): Constructor[];
declare function getCursorAdvanceMethods(): Func[];
declare var cursorRequestMap: WeakMap<IDBPCursor, IDBRequest<IDBCursor>>;
declare var transactionDoneMap: WeakMap<IDBTransaction, Promise<void>>;
declare var transactionStoreNamesMap: WeakMap<IDBTransaction, string[]>;
declare var transformCache: any; // /* NO PRINT IMPLEMENTED: NewExpression */ any
declare export var reverseTransformCache: any; // /* NO PRINT IMPLEMENTED: NewExpression */ any
declare function promisifyRequest<T>(request: IDBRequest<T>): Promise<T>;
declare function cacheDonePromiseForTransaction(tx: IDBTransaction): void;
declare var idbProxyTraps: ProxyHandler<any>;
declare export function addTraps(
  callback: (currentTraps: ProxyHandler<any>) => ProxyHandler<any>
): void;
declare function wrapFunction<T: Func>(func: T): Function;
declare function transformCachableValue(value: any): any;

/**
 * Enhance an IDB object with helpers.
 * @param value The thing to enhance.
 */
declare export function wrap(value: IDBDatabase): IDBPDatabase;
declare export function wrap(value: IDBIndex): IDBPIndex;
declare export function wrap(value: IDBObjectStore): IDBPObjectStore;
declare export function wrap(value: IDBTransaction): IDBPTransaction;
declare export function wrap(
  value: IDBOpenDBRequest
): Promise<IDBPDatabase | void>;
declare export function wrap<T>(value: IDBRequest<T>): Promise<T>;
declare export function wrap(value: any): any;

/**
 * Revert an enhanced IDB object to a plain old miserable IDB one.
 *
 * Will also revert a promise back to an IDBRequest.
 * @param value The enhanced object to revert.
 */
declare interface Unwrap {
  (value: IDBPCursorWithValue<any, any, any, any>): IDBCursorWithValue;
  (value: IDBPCursor<any, any, any, any>): IDBCursor;
  (value: IDBPDatabase): IDBDatabase;
  (value: IDBPIndex<any, any, any, any>): IDBIndex;
  (value: IDBPObjectStore<any, any, any>): IDBObjectStore;
  (value: IDBPTransaction<any, any>): IDBTransaction;
  <T: any>(value: Promise<IDBPDatabase<T>>): IDBOpenDBRequest;
  (value: Promise<IDBPDatabase>): IDBOpenDBRequest;
  <T>(value: Promise<T>): IDBRequest<T>;
}
declare export var unwrap: Unwrap;
