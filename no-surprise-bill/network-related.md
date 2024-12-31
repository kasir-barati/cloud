# Cheap Storage, High Egress Fee

- Storage at $0.02 per GB sounds dreamy.
- Don't be fooled, the **real costs** often hide in the **egress fees**.
  - Egress fees at $0.09 per GB.
  - 4.5x the storage cost!
  - A perfect example of "free entry, paid leave".

## Ref

- [Florian Fanderl's comment on Anthony Monthe's post](https://www.linkedin.com/feed/update/urn:li:activity:7270780334575681536?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7270780334575681536%2C7272580879518969856%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287272580879518969856%2Curn%3Ali%3Aactivity%3A7270780334575681536%29).

# Fetching Data From Your S3 From an EMR Cluster

Forget to add the special endpoint you need to get free access to your data from a VPN that's located in the same account as your S3 bucket can cost you an arm and a leg. Let's dissect the problem:

- We have a workload in our AWS Account.
  - E.g. an [EMR](../aws/Elastic-MapReduce/README.md) cluster running [Apache Spark](https://spark.apache.org/).
- Now our EMR wanted to accesses data stored in a S3 bucket.
- **Crucial**: you have to configure a gateway endpoint in your own VPC.
  - [Learn more about it gateway endpoints for Amazon S3](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html).
- Same thing with DynamoDB.
  - [Gateway endpoints for Amazon DynamoDB](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-ddb.html).

> [!CAUTION]
>
> If you don't configure the aforementioned gateway endpoint, AWS considers all traffic to your S3 bucket to be over the public Internet and you have to pay a ton of money for the bandwidth.

## Ref

- [Florian Fanderl's comment on Anthony Monthe's post](https://www.linkedin.com/feed/update/urn:li:activity:7270780334575681536?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7270780334575681536%2C7272580879518969856%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287272580879518969856%2Curn%3Ali%3Aactivity%3A7270780334575681536%29).
