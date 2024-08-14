# FSx

- Managed service by AWS.
- Use 3rd-party file systems on AWS.
  - Do not confuse it with being able to use other cloud providers.
  - You can use NTFS for example.
- Accessible from AWS services or on-premise infrastructure.

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Description</th>
      <th>Good for</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NetApp ONTAP</td>
      <td>
        Widely-used file system known for enterprise features, high performance,
        and robust data management capabilities.
      </td>
      <td>
        <ul>
          <li>Workloads requiring advanced data management features.</li>
          <li>Enterprise applications with high-performance needs.</li>
          <li>Organizations familiar with NetApp ONTAP.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>OpenZFS</td>
      <td>
        An open-source file system known for its
        <a href="../glossary.md#scalabilityGlobalGlossary">scalability</a>,
        data integrity, and snapshot capabilities.
      </td>
      <td>
        <ul>
          <li>Workloads that require data integrity and protection.</li>
          <li>Scalable storage solutions.</li>
          <li>Environments with a focus on open-source technologies.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Windows File Server</td>
      <td>
        <ul>
          <li>A file system tailored for integration with Windows-based environments
        and applications (e.g. Microsoft active directory integration).</li>
          <li>Supports SMB protocol.</li>
          <li>Supports NTFS.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Windows-based applications and environments.</li>
          <li>Organizations with existing Microsoft ecosystem.</li>
          <li>Workloads requiring SMB protocol support.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Lustre</td>
      <td>
        A high-performance file system designed for large-scale, data-intensive
        workloads.
      </td>
      <td>
        <ul>
          <li>High-performance computing (HPC).</li>
          <li>Big data analytics.</li>
          <li>Workloads requiring fast throughput and low latency.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Footnotes

[^1]: High Performance Computing.
