---
permalink: /docs/codebase/config
---

# Configurations in Teaclave

This Teaclave Config describes all sorts of configurations in the platform. All
configurations are defined in the TOML file format. Basically, there are two types
of configurations in Teaclave: *build config* and *runtime config*.

## Build Config

The build config defines configurations which are provided at compilation time.
That is, this type of configurations will be compiled as the part of the
Teaclave platform and are hard-coded in the services. For example, the root CA
certificate of attestation service used for verifying attestation report,
auditors' public keys for verification of enclave information, and topological
graph of connections between services for mutual attestation. More detailed
explanation of configurations can be seen in the
[`build.config.toml`](https://github.com/apache/incubator-teaclave/blob/master/config/build.config.toml)
file. We also implement a
[`config_gen`](https://github.com/apache/incubator-teaclave/tree/master/config/config_gen)
tool to generate hard-coded configurations in Rust
from the user-defined config in TOML at compilation time.

Note that it is very *important* to define these configurations in build time,
because they are part of Teaclave's *trusted computing base* (TCB) and will be
*remotely attested*. In Teaclave's [threat model](../threat-model.md),
operating system could be compromised. If this configurations is not in TCB
(i.e., cannot be remotely attested), the security and integrity of the platform
may be affected.

## Runtime Config

The runtime config defines some configurations which will be used at execution
runtime. It includes listening and advertised addresses of service endpoints in
Teaclave, the enclave information and auditor's signatures files loaded at
runtime, algorithm/id/key used for connecting attestation services, etc.
Some configurations can be overridden by environment variables. Detailed
explanation of configurations can be found in the
[`runtime.config.toml`](https://github.com/apache/incubator-teaclave/blob/master/config/runtime.config.toml) file.


Note that the runtime config will be loaded when launching the services. We
*should not* trust the content and make sure maliciously crafted config from
this file will not break any data confidentiality/integrity. Otherwise, the
configuration must be defined as a build config.

## Keys and Certificates in Teaclave

Directory `keys` contains keys and certificates used in the Teaclave platform.
Note that these are only for demonstration. *DO NOT use them in production.*

- `enclave_signing_key.pem`: private key to sign SGX enclaves
- `ias_root_ca_cert.pem`: attestation report root CA certificate for Intel SGX
  Attestation Service, obtained from the
  [service website](https://api.portal.trustedservices.intel.com/EPID-attestation)
- `dcap_root_ca_cert.pem`: root CA certificate used for connecting to the
  reference DCAP attestation server and verifying ECDSA attestation reports.
- `dcap_server_cert.pem` and `dcap_server_key.pem`: DCAP attestation server
  end-entity certificate and private key. Certificate is signed by DCAP root CA.
- `auditors`: contains auditors' keys to sign the *enclave info* for mutual
  attestation
