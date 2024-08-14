# Elastic File System (EFS)

- Scalable, elastic, cloud-native NFS[^1] file system.
- Expensive.
- Can be used across AZs.
- You need to provision its capacity[^2].
- Mountable to multiple EC2 (shared storage).
- Available only for EC2 instances with linux OS.

## EFS infrequent access.

- Is enabled when: In EFS Lifecycle Management for your file system you select a lifecycle policy that matches your needs.
- It automatically move your files to the lower cost regional EFS IA[^3] storage class based on the last time they were accessed.

## Share responsibility model

| AWS                                                  | User                                       |
| ---------------------------------------------------- | ------------------------------------------ |
| Infrastructure.                                      | Data encryption.                           |
| Replication.                                         | Backup/snapshot.                           |
| Replacing faulty hardware.                           | What kinda of data is stored on the drive. |
| Ensuring data cannot be accessed by their employees. |                                            |

## Footnotes

[^1]: Network File System.
[^2]: Volume (GB) and [IOPS](../glossary.md#iopsGlobalGlossary).
[^3]: Infrequent Access.
