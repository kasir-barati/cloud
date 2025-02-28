# [DocumentDB](https://aws.amazon.com/de/documentdb/)

> [!TIP]
>
> If you create an index in the AWS DocumentDB in the background then you cannot have two of them at the same time. AWS DocumentDB will cancel the first one and will work on the seconds one.

> [!TIP]
>
> What will happen when `readConcern` is set to prefer to read from the secondary?
>
> - In this case DocumentDB will not define the indexes in the database.
>   - A workaround would be to change the `readConcern` to primary in the connection string which means that then your ODM will try to read form the primary node.
> - On the contrary in a self-hosted MongoDB, the `readConcern=secondary` will create those indexes :).
> 
> Learn more about index selection [in MongoDB](https://www.mongodb.com/docs/manual/tutorial/create-queries-that-ensure-selectivity/), and [DocumentDB]().

# Indexes in MongoDB

- **Selectivity** is the ability of a query to narrow results using indexes (in other **it depends on the query being executed** and **NOT** purely **the field itself**).

  Example #1:

  - database schema: `{ status: "processed" | "unprocessed", productType: string }`.
  - Index on `status` field has low selectivity, if querying for documents with `status = "processed"` will return 99% of the documents.
  - However, it has high selectivity when querying for documents with `status != "processed"` returns 1% of the documents.

  **Improve selectivity** with compound indexes: create a compound index that narrows the documents that a query read. Index multiple fields to reduce the number of documents that need to be scanned.

  **If** MongoDB reads a high number of documents to return results, some queries may perform faster without indexes.

- **Our objective**: Write effective queries that are more selective to allow MongoDB to use indexes efficiently.
- **Best Practice**: Limit the number of possible documents with the indexed field/s to ensure selectivity.

## [Query Plans](https://www.mongodb.com/docs/manual/core/query-plans/)

- Selects the most efficient query plan based on available indexes.
- Evaluates plans by running them during a trial period.
- The winning plan is the one that produces the most results with the least amount of work.

> [!TIP]
>
> An `$or` operator in a query means that first condition should be fulfilled, union with all documents that match the other condition. If you don’t have a separate index for each of the conditions MongoDB will perform a [collection scan (`COLLSCAN`)](https://www.mongodb.com/docs/manual/reference/explain-results/#collection-scan) anyway.
>
> [Ref](https://www.mongodb.com/community/forums/t/is-in-operator-able-to-use-index/150459/4).
