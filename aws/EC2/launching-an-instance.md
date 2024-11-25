# Launching an instance

1. Go to ["EC2" dashboard](https://eu-central-1.console.aws.amazon.com/ec2/home).

   > [!NOTE]
   >
   > This is a direct link to "eu-central-1" availability zone. So you might wanna just search it.

2. Click on "Launch instance":

   ![Launch instance button](./assets/launch-instance.png)

3. Give it a name:

   ![Choose a name for your EC2 instance](./assets/ec2-instance-name-textbox.png)

4. Choose an appropriate OS for your use case, here I am choosing Ubuntu:

   ![Choose an image](./assets/choose-image-box.png)

5. Specify how much resource you need (Instance type), here I choose one that is free.

   ![Choose instance type](./assets/instance-type.png)

6. If you wanna be able to connect to your EC2 instance choose/create a key pair, here I'll use the one that I have created before ("AmazonLinuxEC2InstanceKeyPair"):

   ![Choose or create a key pair](./assets/key-pair.png)

7. If you specified a key pair in the previous step now you need to also [choose/create a security group](./security-groups.md#create-a-security-group) where SSH is open. Thus we can access our EC2 instance. in the network settings section:

   ![Choose a security group which allows Inbound SSH requests](./assets/network-setting-choose-a-security-group.png)

   > [!NOTE]
   >
   > If you've created a new security group you need to add SSH to your inbound rules in "security groups" dashboard.

8. Then you need to configure your EC2 instance's storage:

   ![Configure storage for your EC2 instance](./assets/configure-storage.png)

9. Lastly click on "Launch instance".

   ![Final launch instance button](./assets/final-launch-instance-btn.png)

   > [!NOTE]
   >
   > We did not change any advance setting here but you can set them to what serves your needs.
