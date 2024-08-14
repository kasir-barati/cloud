# Security

- Who is responsible for what?
  <table>
    <thead>
      <tr>
        <th>AWS</th>
        <th>Customers of AWS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Protecting infrastructure.</td>
        <td>
          Protecting your EC2 instances
          <ul>
            <li>Update your OS.</li>
            <li>Control IAM roles and permissions.</li>
            <li>Configure network and firewalls properly.</li>
            <li>Install security patches for libs/softwares.</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Protecting manged services such as S3.</td>
        <td>Encrypt app data.</td>
      </tr>
    </tbody>
  </table>

## DDoS

![DDoS attack overall mechanism and inner parts infographic](./ddos-attack.webp)

- Stands for Distributed Denial of Service.
- Protect your app against DDoS with:

  | Option          | Cost         | Protect apps                                                                        |
  | --------------- | ------------ | ----------------------------------------------------------------------------------- |
  | Shield standard | Free         | Against common, most frequently occurring network and transport layer DDoS attacks. |
  | Shield advanced | Paid service | Against DDoS attacks, volumetric bots, and vulnerability exploitation attempts.     |
  | WAF & Shield    | Paid service | Against common attack patterns (e.g. SQL injection or cross-site scripting (XSS)).  |

  - WAF & Shield:
    - Web Application Framework.
    - Charged for rules inside rule groups that are created by you.
    - Works on layer 7:
      - Create rules to to filter web requests based on:
        - Their size.
        - Their location (geo-match).
        - Conditions such as IP addresses, HTTP headers and body, or custom URIs.
        - Rate: A rate-based rule that shields against DDoS by utilizing globally distributed network of AWS edge locations:
          - **Route 53**: Only allow valid DNS requests to reach the service.
          - **CloudFront**: Only allowing valid traffics for web applications to pass through to the service.
      - Protects our app against SQL injection and XSS (cross-site scripting).
      - Deployed on [ALB](./EC2/README.md#alb), API gateway, and CloudFront.
  - Common attacks:
    - SYN/UDP floods.
    - Reflection attack.
    - And other layer 3 and layer 4 attacks.
  - Shield standard is activated by default.
  - Shield advanced costs something like $3,000 per month per organization.
  - DDoS response team for supporting AWS customers.

# Glossary

<dl>
  <dt id="managedService">
    Manged service:
  </dt>
  <dd>
    Cloud computing services provided by AWS. They handle the underlying infrastructure and operational tasks, allowing users to focus on their applications and workloads. E.g. S3, RDS.
  </dd>
  <dt id="rdbms">
    RDBMS
  </dt>
  <dd>
    Relational Database Management System.
  </dd>
  <dt id="acl">
    ACL:
  </dt>
  <dd>
    Stands for Access Control List. It is a list of rules that specifies which users or systems are granted or denied access to a particular object or system resource.
  </dd>
</dl>
