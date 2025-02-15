# Multipart Upload

After you initiate a multipart upload and upload one or more parts, you must either complete or stop the multipart upload to stop incurring charges for storage of the uploaded parts. Only after you complete or stop a multipart upload will Amazon S3 free up the parts storage and stop billing you for the parts storage.

> [!TIP]
>
> To minimize your storage costs, it is recommended that you configure a lifecycle rule to delete incomplete multipart uploads after a specified number of days by using the `AbortIncompleteMultipartUpload` action.

## Learn More

- [Configuring a bucket lifecycle configuration to delete incomplete multipart uploads](https://docs.aws.amazon.com/AmazonS3/latest/userguide//mpu-abort-incomplete-mpu-lifecycle-config.html).

## Ref

- [Uploading and copying objects using multipart upload in Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html).
