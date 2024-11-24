# Keywords in AWS infrastructure

## Region

- A physical location around the world where we cluster data centers.
- Each consists of a minimum of 3, isolated, and physically separate AZs within a geographic area.

## Availability Zone (AZ)

- One or more discrete data centers.
- All traffic between AZs is encrypted.
- AZs are physically separated by a meaningful distance.
- Has independent power, cooling, and physical security.
- Connected via redundant power, ultra-low-latency networks.

## Edge locations

- AWS data centers designed to deliver services with the lowest latency possible.
- Usually part of a larger CDN distribution.
- Optimized for caching and delivering content to end-users efficiently.
- Closer to users than Regions or AZs.
- A subset of services which use edge locations:
  - CloudFront.
  - Route 53
  - Web Application Firewall..
  - AWS Shield.

## Points of presence (PoP)

- A <table style="display:inline;"><tr><td>physical location</td></tr><tr><td>facility</td></tr><tr><td>data center</td></tr></table> where two or more <table style="display:inline;"><tr><td>networks</td></tr> <tr><td>communication devices</td></tr></table> share a connection.
- AWS has a globally distributed point of presence (PoP) network.
- PoPs host:
  - **Amazon CloudFront**: a Content Delivery Network (CDN).
  - **Amazon Route 53**: a public Domain Name System (DNS).
  - **Resolution service**.
  - **AWS Global Accelerator (AGA)**: an edge networking optimization service.
- Each PoP is isolated from the others.

### `Edge locations === PoP`

They are related concepts in network architecture but not same.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Edge location</th>
      <th>PoP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Function</td>
      <td>Content delivery.</td>
      <td>Interconnection point for various networks; A central hub.</td>
    </tr>
    <tr>
      <td>Infrastructure</td>
      <td>Smaller data centers strategically deployed in densely populated areas or key internet exchange points (IXPs).</td>
      <td>Vary in complexity, The key requirement is the ability to interconnect different networks efficiently.</td>
    </tr>
    <tr>
      <td>Focus</td>
      <td>Prioritizes content delivery speed and user experience.</td>
      <td>Prioritizes network connectivity and data exchange.</td>
    </tr>
    <tr>
      <td>Content Storage</td>
      <td>Robust caching servers, storing frequently accessed content like website assets, videos, or static files.</td>
      <td>Generally do not store significant amounts of user data or content. Just route data packets efficiently.</td>
    </tr>
  </tbody>
</table>

In other word:

- **PoP**: an intersection where data traffic from various networks meets and gets routed.
- **Edge Location**: a strategically positioned warehouse[^1] within a content delivery network, ensuring fast and efficient delivery of cached content to users in a specific region.

## Latency

- The necessary time for a packet on network to reach the other party (e.g. a server).

# Global apps

- Decreased latency => better UX.
- Disaster recovery => better availability (HA).

## Different application deployment architecture

<table>
  <thead>
    <tr>
      <th style="text-align: center"></th>
      <th style="text-align: center">Single region, single AZ</th>
      <th style="text-align: center">Single region, multi-AZ</th>
      <th style="text-align: center">Muti-region, active-passive</th>
      <th style="text-align: center">Muti-region, active-active</th>
    </tr>
  </thead>
  <tbody style="text-align: center">
    <tr>
      <td>High-Availability</td>
      <td><span style="color: red">&cross;</span></td>
      <td><span style="color: green">&check;</span></td>
      <td><span style="color: green">&check;</span></td>
      <td><span style="color: green">&check;</span></td>
    </tr>
    <tr>
      <td>Global latency</td>
      <td><span style="color: red">&cross;</span></td>
      <td><span style="color: red">&cross;</span></td>
      <td>
        <p>
          <span style="color: green">&check;</span> Read
          <br />
          <span style="color: red">&cross;</span> Write
        </p>
      </td>
      <td>
        <p>
          <span style="color: green">&check;</span> Read
          <br />
          <span style="color: green">&check;</span> Write
        </p>
      </td>
    </tr>
    <tr>
      <td>Implementaion difficulty</td>
      <td><span style="color: darkgreen">Relatively easy.</span></td>
      <td><span style="color: lightgreen">Moderate.</span></td>
      <td><span style="color: yellow">Challenging.</span></td>
      <td><span style="color: orangered">Hard.</span></td>
    </tr>
    <tr>
      <td>Visualization</td>
      <td><img src="./single-region-single-az.png" /></td>
      <td><img src="./single-region-multi-az.png" /></td>
      <td><img src="./multi-region-active-passive.png" /></td>
      <td><img src="./multi-region-active-active.png" /></td>
    </tr>
  </tbody>
</table>

# References

- [Is Point Of Presence Same As Edge Location?](https://www.ioriver.io/questions/is-point-of-presence-same-as-edge-location)

# Footnotes

[^1]: **Warehouse** here is used metaphorically to describe a server or a data center that stores and manages cached content.
