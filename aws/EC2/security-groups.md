# Security groups

- A virtual firewall around our EC2 instance
- They're:
  - Associated with _network interfaces_.
  - Stateful.
- <a id="leastPrivilegeBaseline" href="#leastPrivilegeBaseline">#</a> Can only ALLOW.
  - This is [principle of least privilege](./glossary.md#principleOfLeastPrivilege).
- Can reference other security groups.

## Create a security group

1. Go to ["Security Groups" dashboard](https://eu-central-1.console.aws.amazon.com/ec2/home).

   > [!NOTE]
   >
   > This is a direct link to "eu-central-1" availability zone. So you might wanna just search it.

2. Click on "Create security group" button:

   ![Create security group button](./assets/create-security-groups-btn.png)

3. Pick a meaningful name, write a good description.

   ![Security group name and description](./assets/security-group-name-and-description.png)

4. Add allowed inbound rules, remember that AWS works with [least privilege principle as baseline](#leastPrivilegeBaseline), for example here we have exposed SSH port to the world.

   ![Inbound rules](./assets/inbound-rules-in-security-group.png)

5. Then it is time to specify to where your EC2 instance can send a request -- "Outbound rules":

   ![Security group which allows EC2 instance to access anywhere](./assets/security-group-outbound-rules.png)

6. Finally add some tags [if you need any](../README.md#tags-in-aws).

   ![Specify tags for your security group](./assets/tags-for-security-group.png)
