<dl>
  <dt id="iopsGlobalGlossary">
    <a href="#iopsGlobalGlossary">#</a>
    IOPS:
  </dt>
  <dd>
    <ul>
      <li>
        Input Output Operations Per Second.
      </li>
      <li>
        An important metric that measures the performance of cloud storage.
      </li>
      <li>
        How swiftly read and write data can be executed from a hard drive.
      </li>
      <li>
        <a href="https://stackoverflow.com/q/37058095/8784518">
          Learn more
        </a>.
      </li>
    </ul>
  </dd>
  <dt id="elasticityGlobalGlossary">
    <a href="#elasticityGlobalGlossary">#</a>
    Elasticity:
  </dt>
  <dd>
    The ability to acquire resources as you need them and release resources when you no longer need them. E.g. auto-scaling.
  </dd>
  <dt id="scalabilityGlobalGlossary">
    <a href="#scalabilityGlobalGlossary">#</a>
    Scalability:
  </dt>
  <dd>
    Being able to accommodate a large load by scaling up or out.
  </dd>
  <dt id="agilityGlobalGlossary">
    <a href="#agilityGlobalGlossary">#</a>
    Agility:
  </dt>
  <dd>
    New IT resources are available on-demand.
  </dd>
  <dt id="distributedSystems">
    <a href="#distributedSystems">#</a>
    Distributed systems:
  </dt>
  <dd>
    Multiple computers work together to solve a common problem (<a href="https://aws.amazon.com/what-is/distributed-computing/">ref</a>).
  </dd>
  <dd>
    Computer systems whose inter-communicating components are located on different networked computers (<a href="https://en.wikipedia.org/wiki/Distributed_computing">ref</a>).
  </dd>
  <dt id="managedServiceGlossary">
    <a href="#managedServiceGlossary">#</a>
    Manged service:
  </dt>
  <dd>Cloud computing services provided by AWS.</dd>
  <dd>
    They handle the underlying infrastructure and operational tasks, allowing users to focus on their applications and workloads. E.g. S3, RDS.
  </dd>
  <dt id="rdbmsGlossary">
    <a href="#rdbmsGlossary">#</a>
    RDBMS
  </dt>
  <dd>
    Relational Database Management System.
  </dd>
  <dt id="aclGlossary">
    <a href="#aclGlossary">#</a>
    ACL:
  </dt>
  <dd>Stands for Access Control List.</dd>
  <dd>
    It is a list of rules that specifies which users or systems are granted or denied access to a particular object or system resource.
  </dd>
  <dt id="autoScalingGroupDefinition">
    <a href="#autoScalingGroupDefinition">#</a>
    Auto Scaling Group
  </dt>
  <dd>
    <table>
      <caption>To scale we have 2 options:</caption>
      <thead>
        <tr>
          <th></th>
          <th>Vertical Scaling</th>
          <th>Horizontal Scaling</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>How it works</th>
          <td>Increase the size (e.g. t2.micro => t2.large).</td>
          <td>Increase the number of instances (e.g. more ElastiCache instances).</td>
        </tr>
        <tr>
          <th>Considerations</th>
          <td>Limited (Cannot be scaled indefinitely).</td>
          <td>
            <ul>
              <li>
                <b>Distributed systems</b>: more work regarding data integrity and
                other aspects of a distributed system.
              </li>
              <li>
                <b>High-availability</b>: aligned with
                <a href="#elasticityGlobalGlossary">Elasticity</a>.
              </li>
              <li>
                You can setup your ASG template to provision new EC2 instances
                in different AZs.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>AKA</th>
          <td>Scale up/down.</td>
          <td>Scale out/in.</td>
        </tr>
      </tbody>
    </table>
  </dd>
</dl>
