// @flow

/**
 * Flowtype definitions for entry.ts
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.9.2
 */

import { omit } from 'flown'

import { type wrap } from "./idb-wrap-value";

type DBSchemaValue = any
type IDBObjectStoreParameters = any
type IDBIndexParameters = any
type IDBCursorDirection = any
type IDBValidKey = any
type IDBTransactionMode = any
type AsyncIterableIterator<T> = AsyncIterator<T>

interface DBSchema {
  [s: string]: DBSchemaValue;
}

declare module "idb" {

  declare interface OpenDBCallbacks<DBTypes: DBSchema | mixed> {
    /**
     * Called if this version of the database has never been opened before. Use it to specify the
     * schema for the database.
     * @param database A database instance that you can use to add/remove stores and indexes.
     * @param oldVersion Last version of the database opened by the user.
     * @param newVersion Whatever new version you provided.
     * @param transaction The transaction for this upgrade. This is useful if you need to get data
     * from other stores as part of a migration.
     */
    upgrade?: (
      database: IDBPDatabase<DBTypes>,
      oldVersion: number,
      newVersion: number | null,
      transaction: IDBPTransaction<DBTypes>
    ) => void;
  
    /**
     * Called if there are older versions of the database open on the origin, so this version cannot
     * open.
     */
    blocked?: () => void;
  
    /**
     * Called if this connection is blocking a future version of the database from opening.
     */
    blocking?: () => void;
  }
  
  declare interface DeleteDBCallbacks {
    /**
     * Called if there are connections to this database open, so it cannot be deleted.
     */
    blocked?: () => void;
  }
  

  /**
   * Open a database.
   * @param name Name of the database.
   * @param version Schema version.
   * @param callbacks Additional callbacks.
   */
  declare export function openDB<DBTypes: DBSchema | mixed>(
    name: string,
    version: number,
    x: OpenDBCallbacks<DBTypes>
  ): Promise<IDBPDatabase<DBTypes>>;

  /**
   * Delete a database.
   * @param name Name of the database.
   */
  declare export function deleteDB(
    name: string,
    x: DeleteDBCallbacks
  ): Promise<void>;

  declare type KnownKeys<
    T
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare interface IndexKeys {
    [s: string]: IDBValidKey;
  }

  declare interface DBSchemaValue {
    key: IDBValidKey;
    value: any;
    indexes?: IndexKeys;
  }

  declare type StoreNames<
    DBTypes: DBSchema | mixed
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare type StoreValue<
    DBTypes: DBSchema | mixed,
    StoreName: StoreNames<DBTypes>
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare type StoreKey<
    DBTypes: DBSchema | mixed,
    StoreName: StoreNames<DBTypes>
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare type IndexNames<
    DBTypes: DBSchema | mixed,
    StoreName: StoreNames<DBTypes>
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare type IndexKey<
    DBTypes: DBSchema | mixed,
    StoreName: StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName>
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare type CursorSource<
    DBTypes: DBSchema | mixed,
    TxStores: StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare type CursorKey<
    DBTypes: DBSchema | mixed,
    StoreName: StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed
  > = /* Flow doesn't support conditional types, use `$Call` utility type */ any;

  declare export type IDBPDatabase<DBTypes: DBSchema | mixed = mixed> = {
    /**
     * The names of stores in the database.
     */
    +objectStoreNames: StoreNames<DBTypes>[],

    /**
     * Creates a new object store.
     *
     * Throws a "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    createObjectStore<Name: StoreNames<DBTypes>>(
      name: Name,
      optionalParameters?: IDBObjectStoreParameters
    ): IDBPObjectStore<DBTypes, StoreNames<DBTypes>[], Name>,

    /**
     * Deletes the object store with the given name.
     *
     * Throws a "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    deleteObjectStore(name: StoreNames<DBTypes>): void,

    /**
     * Start a new transaction.
     * @param storeNames The object store(s) this transaction needs.
     * @param mode
     */
    transaction<Name: StoreNames<DBTypes>>(
      storeNames: Name,
      mode?: IDBTransactionMode
    ): IDBPTransaction<DBTypes, [Name]>,
    transaction<Names: StoreNames<DBTypes>[]>(
      storeNames: Names,
      mode?: IDBTransactionMode
    ): IDBPTransaction<DBTypes, Names>,

    /**
     * Add a value to a store.
     *
     * Rejects if an item of a given key already exists in the store.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param value
     * @param key
     */
    add<Name: StoreNames<DBTypes>>(
      storeName: Name,
      value: StoreValue<DBTypes, Name>,
      key?: StoreKey<DBTypes, Name> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, Name>>,

    /**
     * Deletes all records in a store.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     */
    clear(name: StoreNames<DBTypes>): Promise<void>,

    /**
     * Retrieves the number of records matching the given query in a store.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param key
     */
    count<Name: StoreNames<DBTypes>>(
      storeName: Name,
      key?: StoreKey<DBTypes, Name> | IDBKeyRange
    ): Promise<number>,

    /**
     * Retrieves the number of records matching the given query in an index.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param indexName Name of the index within the store.
     * @param key
     */
    countFromIndex<
      Name: StoreNames<DBTypes>,
      IndexName: IndexNames<DBTypes, Name>
    >(
      storeName: Name,
      indexName: IndexName,
      key?: IndexKey<DBTypes, Name, IndexName> | IDBKeyRange
    ): Promise<number>,

    /**
     * Deletes records in a store matching the given query.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param key
     */
    delete<Name: StoreNames<DBTypes>>(
      storeName: Name,
      key: StoreKey<DBTypes, Name> | IDBKeyRange
    ): Promise<void>,

    /**
     * Retrieves the value of the first record in a store matching the query.
     *
     * Resolves with undefined if no match is found.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param query
     */
    get<Name: StoreNames<DBTypes>>(
      storeName: Name,
      query: StoreKey<DBTypes, Name> | IDBKeyRange
    ): Promise<StoreValue<DBTypes, Name> | void>,

    /**
     * Retrieves the value of the first record in an index matching the query.
     *
     * Resolves with undefined if no match is found.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param indexName Name of the index within the store.
     * @param query
     */
    getFromIndex<Name: StoreNames<DBTypes>, IndexName: IndexNames<DBTypes, Name>>(
      storeName: Name,
      indexName: IndexName,
      query: IndexKey<DBTypes, Name, IndexName> | IDBKeyRange
    ): Promise<StoreValue<DBTypes, Name> | void>,

    /**
     * Retrieves all values in a store that match the query.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param query
     * @param count Maximum number of values to return.
     */
    getAll<Name: StoreNames<DBTypes>>(
      storeName: Name,
      query?: StoreKey<DBTypes, Name> | IDBKeyRange,
      count?: number
    ): Promise<StoreValue<DBTypes, Name>[]>,

    /**
     * Retrieves all values in an index that match the query.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param indexName Name of the index within the store.
     * @param query
     * @param count Maximum number of values to return.
     */
    getAllFromIndex<
      Name: StoreNames<DBTypes>,
      IndexName: IndexNames<DBTypes, Name>
    >(
      storeName: Name,
      indexName: IndexName,
      query?: IndexKey<DBTypes, Name, IndexName> | IDBKeyRange,
      count?: number
    ): Promise<StoreValue<DBTypes, Name>[]>,

    /**
     * Retrieves the keys of records in a store matching the query.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param query
     * @param count Maximum number of keys to return.
     */
    getAllKeys<Name: StoreNames<DBTypes>>(
      storeName: Name,
      query?: StoreKey<DBTypes, Name> | IDBKeyRange,
      count?: number
    ): Promise<StoreKey<DBTypes, Name>[]>,

    /**
     * Retrieves the keys of records in an index matching the query.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param indexName Name of the index within the store.
     * @param query
     * @param count Maximum number of keys to return.
     */
    getAllKeysFromIndex<
      Name: StoreNames<DBTypes>,
      IndexName: IndexNames<DBTypes, Name>
    >(
      storeName: Name,
      indexName: IndexName,
      query?: IndexKey<DBTypes, Name, IndexName> | IDBKeyRange,
      count?: number
    ): Promise<StoreKey<DBTypes, Name>[]>,

    /**
     * Retrieves the key of the first record in a store that matches the query.
     *
     * Resolves with undefined if no match is found.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param query
     */
    getKey<Name: StoreNames<DBTypes>>(
      storeName: Name,
      query: StoreKey<DBTypes, Name> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, Name> | void>,

    /**
     * Retrieves the key of the first record in an index that matches the query.
     *
     * Resolves with undefined if no match is found.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param indexName Name of the index within the store.
     * @param query
     */
    getKeyFromIndex<
      Name: StoreNames<DBTypes>,
      IndexName: IndexNames<DBTypes, Name>
    >(
      storeName: Name,
      indexName: IndexName,
      query: IndexKey<DBTypes, Name, IndexName> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, Name> | void>,

    /**
     * Put an item in the database.
     *
     * Replaces any item with the same key.
     *
     * This is a shortcut that creates a transaction for this single action. If you need to do more
     * than one action, create a transaction instead.
     * @param storeName Name of the store.
     * @param value
     * @param key
     */
    put<Name: StoreNames<DBTypes>>(
      storeName: Name,
      value: StoreValue<DBTypes, Name>,
      key?: StoreKey<DBTypes, Name> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, Name>>
  };

  declare type IDBPTransactionExtends = omit<
    IDBTransaction,
    ["db", "objectStore", "objectStoreNames"]
  >;
  declare export type IDBPTransaction<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[]
  > = {
    /**
     * The names of stores in scope for this transaction.
     */
    +objectStoreNames: TxStores,

    /**
     * The transaction's connection.
     */
    +db: IDBPDatabase<DBTypes>,

    /**
     * Promise for the completion of this transaction.
     */
    +done: Promise<void>,

    /**
     * The associated object store, if the transaction covers a single store, otherwise undefined.
     */
    +store: /* Flow doesn't support conditional types, use `$Call` utility type */ any,

    /**
     * Returns an IDBObjectStore in the transaction's scope.
     */
    objectStore<StoreName: $ElementType<TxStores, number>>(
      name: StoreName
    ): IDBPObjectStore<DBTypes, TxStores, StoreName>
  } & IDBPTransactionExtends;

  declare type IDBPObjectStoreExtends = omit<
    IDBObjectStore,
    | "transaction"
    | "add"
    | "clear"
    | "count"
    | "createIndex"
    | "delete"
    | "get"
    | "getAll"
    | "getAllKeys"
    | "getKey"
    | "index"
    | "openCursor"
    | "openKeyCursor"
    | "put"
    | "indexNames"
    | "name"
  >;

  declare export type IDBPObjectStore<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>
  > = {
    /**
     * The names of indexes in the store.
     */
    +indexNames: IndexNames<DBTypes, StoreName>[],

    /**
     * The name of the store to newName. Can be set during an upgrade transaction.
     */
    name: StoreName,

    /**
     * The associated transaction.
     */
    +transaction: IDBPTransaction<DBTypes, TxStores>,

    /**
     * Add a value to the store.
     *
     * Rejects if an item of a given key already exists in the store.
     */
    add(
      value: StoreValue<DBTypes, StoreName>,
      key?: StoreKey<DBTypes, StoreName> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, StoreName>>,

    /**
     * Deletes all records in store.
     */
    clear(): Promise<void>,

    /**
     * Retrieves the number of records matching the given query.
     */
    count(key?: StoreKey<DBTypes, StoreName> | IDBKeyRange): Promise<number>,

    /**
     * Creates a new index in store.
     *
     * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    createIndex<IndexName: IndexNames<DBTypes, StoreName>>(
      name: IndexName,
      keyPath: string | string[],
      options?: IDBIndexParameters
    ): IDBPIndex<DBTypes, TxStores, StoreName, IndexName>,

    /**
     * Deletes records in store matching the given query.
     */
    delete(key: StoreKey<DBTypes, StoreName> | IDBKeyRange): Promise<void>,

    /**
     * Retrieves the value of the first record matching the query.
     *
     * Resolves with undefined if no match is found.
     */
    get(
      query: StoreKey<DBTypes, StoreName> | IDBKeyRange
    ): Promise<StoreValue<DBTypes, StoreName> | void>,

    /**
     * Retrieves all values that match the query.
     * @param query
     * @param count Maximum number of values to return.
     */
    getAll(
      query?: StoreKey<DBTypes, StoreName> | IDBKeyRange,
      count?: number
    ): Promise<StoreValue<DBTypes, StoreName>[]>,

    /**
     * Retrieves the keys of records matching the query.
     * @param query
     * @param count Maximum number of keys to return.
     */
    getAllKeys(
      query?: StoreKey<DBTypes, StoreName> | IDBKeyRange,
      count?: number
    ): Promise<StoreKey<DBTypes, StoreName>[]>,

    /**
     * Retrieves the key of the first record that matches the query.
     *
     * Resolves with undefined if no match is found.
     */
    getKey(
      query: StoreKey<DBTypes, StoreName> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, StoreName> | void>,

    /**
     * Get a query of a given name.
     */
    index<IndexName: IndexNames<DBTypes, StoreName>>(
      name: IndexName
    ): IDBPIndex<DBTypes, TxStores, StoreName, IndexName>,

    /**
     * Opens a cursor over the records matching the query.
     *
     * Resolves with null if no matches are found.
     * @param query If null, all records match.
     * @param direction
     */
    openCursor(
      query?: StoreKey<DBTypes, StoreName> | IDBKeyRange,
      direction?: IDBCursorDirection
    ): Promise<IDBPCursorWithValue<DBTypes, TxStores, StoreName> | null>,

    /**
     * Opens a cursor over the keys matching the query.
     *
     * Resolves with null if no matches are found.
     * @param query If null, all records match.
     * @param direction
     */
    openKeyCursor(
      query?: StoreKey<DBTypes, StoreName> | IDBKeyRange,
      direction?: IDBCursorDirection
    ): Promise<IDBPCursor<DBTypes, TxStores, StoreName> | null>,

    /**
     * Put an item in the store.
     *
     * Replaces any item with the same key.
     */
    put(
      value: StoreValue<DBTypes, StoreName>,
      key?: StoreKey<DBTypes, StoreName> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, StoreName>>,

    /**
     * Iterate over the records matching the query.
     * @param query If null, all records match.
     * @param direction
     */
    iterate(
      query?: StoreKey<DBTypes, StoreName> | IDBKeyRange,
      direction?: IDBCursorDirection
    ): AsyncIterableIterator<
      IDBPCursorWithValueIteratorValue<DBTypes, TxStores, StoreName>
    >
  } & IDBPObjectStoreExtends;

  declare type IDBPIndexExtends = omit<
    IDBIndex,
    | "objectStore"
    | "count"
    | "get"
    | "getAll"
    | "getAllKeys"
    | "getKey"
    | "openCursor"
    | "openKeyCursor"
  >;

  declare export type IDBPIndex<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> = IndexNames<DBTypes, StoreName>
  > = {
    /**
     * The IDBObjectStore the index belongs to.
     */
    +objectStore: IDBPObjectStore<DBTypes, TxStores, StoreName>,

    /**
     * Retrieves the number of records matching the given query.
     */
    count(
      key?: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange
    ): Promise<number>,

    /**
     * Retrieves the value of the first record matching the query.
     *
     * Resolves with undefined if no match is found.
     */
    get(
      query: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange
    ): Promise<StoreValue<DBTypes, StoreName> | void>,

    /**
     * Retrieves all values that match the query.
     * @param query
     * @param count Maximum number of values to return.
     */
    getAll(
      query?: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange,
      count?: number
    ): Promise<StoreValue<DBTypes, StoreName>[]>,

    /**
     * Retrieves the keys of records matching the query.
     * @param query
     * @param count Maximum number of keys to return.
     */
    getAllKeys(
      query?: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange,
      count?: number
    ): Promise<StoreKey<DBTypes, StoreName>[]>,

    /**
     * Retrieves the key of the first record that matches the query.
     *
     * Resolves with undefined if no match is found.
     */
    getKey(
      query: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange
    ): Promise<StoreKey<DBTypes, StoreName> | void>,

    /**
     * Opens a cursor over the records matching the query.
     *
     * Resolves with null if no matches are found.
     * @param query If null, all records match.
     * @param direction
     */
    openCursor(
      query?: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange,
      direction?: IDBCursorDirection
    ): Promise<IDBPCursorWithValue<
      DBTypes,
      TxStores,
      StoreName,
      IndexName
    > | null>,

    /**
     * Opens a cursor over the keys matching the query.
     *
     * Resolves with null if no matches are found.
     * @param query If null, all records match.
     * @param direction
     */
    openKeyCursor(
      query?: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange,
      direction?: IDBCursorDirection
    ): Promise<IDBPCursor<DBTypes, TxStores, StoreName, IndexName> | null>,

    /**
     * Iterate over the index.
     */
    @@asyncIterator: () => AsyncIterableIterator<
      IDBPCursorWithValueIteratorValue<DBTypes, TxStores, StoreName, IndexName>
    >,

    /**
     * Iterate over the records matching the query.
     *
     * Resolves with null if no matches are found.
     * @param query If null, all records match.
     * @param direction
     */
    iterate(
      query?: IndexKey<DBTypes, StoreName, IndexName> | IDBKeyRange,
      direction?: IDBCursorDirection
    ): AsyncIterableIterator<
      IDBPCursorWithValueIteratorValue<DBTypes, TxStores, StoreName, IndexName>
    >
  } & IDBPIndexExtends;

  declare type IDBPCursorExtends = omit<
    IDBCursor,
    | "key"
    | "primaryKey"
    | "source"
    | "advance"
    | "continue"
    | "continuePrimaryKey"
    | "delete"
    | "update"
  >;

  declare export type IDBPCursor<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed = mixed
  > = {
    /**
     * The key of the current index or object store item.
     */
    +key: CursorKey<DBTypes, StoreName, IndexName>,

    /**
     * The key of the current object store item.
     */
    +primaryKey: StoreKey<DBTypes, StoreName>,

    /**
     * Returns the IDBObjectStore or IDBIndex the cursor was opened from.
     */
    +source: CursorSource<DBTypes, TxStores, StoreName, IndexName>,

    /**
     * Advances the cursor a given number of records.
     *
     * Resolves to null if no matching records remain.
     */
    advance<T>(count: number): Promise<T | null>,

    /**
     * Advance the cursor by one record (unless 'key' is provided).
     *
     * Resolves to null if no matching records remain.
     * @param key Advance to the index or object store with a key equal to or greater than this value.
     */
    continue<T>(
      key?: CursorKey<DBTypes, StoreName, IndexName>
    ): Promise<T | null>,

    /**
     * Advance the cursor by given keys.
     *
     * The operation is 'and' – both keys must be satisfied.
     *
     * Resolves to null if no matching records remain.
     * @param key Advance to the index or object store with a key equal to or greater than this value.
     * @param primaryKey and where the object store has a key equal to or greater than this value.
     */
    continuePrimaryKey<T>(
      key: CursorKey<DBTypes, StoreName, IndexName>,
      primaryKey: StoreKey<DBTypes, StoreName>
    ): Promise<T | null>,

    /**
     * Delete the current record.
     */
    delete(): Promise<void>,

    /**
     * Updated the current record.
     */
    update(
      value: StoreValue<DBTypes, StoreName>
    ): Promise<StoreKey<DBTypes, StoreName>>,

    /**
     * Iterate over the cursor.
     */
    @@asyncIterator: () => AsyncIterableIterator<
      IDBPCursorIteratorValue<DBTypes, TxStores, StoreName, IndexName>
    >
  } & IDBPCursorExtends;

  declare type IDBPCursorIteratorValueExtends<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed = mixed
  > = omit<
    IDBPCursor<DBTypes, TxStores, StoreName, IndexName>,
    "advance" | "continue" | "continuePrimaryKey"
  >;

  declare export type IDBPCursorIteratorValue<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed = mixed
  > = {
    /**
     * Advances the cursor a given number of records.
     */
    advance<T>(count: number): void,

    /**
     * Advance the cursor by one record (unless 'key' is provided).
     * @param key Advance to the index or object store with a key equal to or greater than this value.
     */
    continue<T>(key?: CursorKey<DBTypes, StoreName, IndexName>): void,

    /**
     * Advance the cursor by given keys.
     *
     * The operation is 'and' – both keys must be satisfied.
     * @param key Advance to the index or object store with a key equal to or greater than this value.
     * @param primaryKey and where the object store has a key equal to or greater than this value.
     */
    continuePrimaryKey<T>(
      key: CursorKey<DBTypes, StoreName, IndexName>,
      primaryKey: StoreKey<DBTypes, StoreName>
    ): void
  } & IDBPCursorIteratorValueExtends<DBTypes, TxStores, StoreName, IndexName>;

  declare export type IDBPCursorWithValue<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed = mixed
  > = {
    /**
     * The value of the current item.
     */
    +value: StoreValue<DBTypes, StoreName>,

    /**
     * Iterate over the cursor.
     */
    @@asyncIterator: () => AsyncIterableIterator<
      IDBPCursorWithValueIteratorValue<DBTypes, TxStores, StoreName, IndexName>
    >
  } & IDBPCursor<DBTypes, TxStores, StoreName, IndexName>;

  declare type IDBPCursorWithValueIteratorValueExtends<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed = mixed
  > = omit<
    IDBPCursorWithValue<DBTypes, TxStores, StoreName, IndexName>,
    "advance" | "continue" | "continuePrimaryKey"
  >;

  declare export type IDBPCursorWithValueIteratorValue<
    DBTypes: DBSchema | mixed = mixed,
    TxStores: StoreNames<DBTypes>[] = StoreNames<DBTypes>[],
    StoreName: StoreNames<DBTypes> = StoreNames<DBTypes>,
    IndexName: IndexNames<DBTypes, StoreName> | mixed = mixed
  > = {
    /**
     * Advances the cursor a given number of records.
     */
    advance<T>(count: number): void,

    /**
     * Advance the cursor by one record (unless 'key' is provided).
     * @param key Advance to the index or object store with a key equal to or greater than this value.
     */
    continue<T>(key?: CursorKey<DBTypes, StoreName, IndexName>): void,

    /**
     * Advance the cursor by given keys.
     *
     * The operation is 'and' – both keys must be satisfied.
     * @param key Advance to the index or object store with a key equal to or greater than this value.
     * @param primaryKey and where the object store has a key equal to or greater than this value.
     */
    continuePrimaryKey<T>(
      key: CursorKey<DBTypes, StoreName, IndexName>,
      primaryKey: StoreKey<DBTypes, StoreName>
    ): void
  } & IDBPCursorWithValueIteratorValueExtends<
    DBTypes,
    TxStores,
    StoreName,
    IndexName
  >

}
