# Beanstalk

- It creates an S3 bucket. But won't delete it on Beanstalk deletion. Thus you need to take care of that manually.
  > [!CAUTION]
  >
  > You need to remove "Deny" policy for DeleteBucket for that first.
