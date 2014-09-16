# biojs-io-gff

[![Build Status](https://secure.travis-ci.org/greenify/biojs-io-gff.png?branch=master)](http://travis-ci.org/greenify/biojs-io-gff)
[![NPM version](https://badge-me.herokuapp.com/api/npm/biojs-io-gff.png)](http://badges.enytc.com/for/npm/biojs-io-gff) 

> A GFF (general feature format) parser

[Official Spec](https://www.sanger.ac.uk/resources/software/gff/spec.html)

>  <seqname> <source> <feature> <start> <end> <score> <strand> <frame> [attributes] [comments]

## Getting Started
Install the module with: `npm install biojs-io-gff`

```javascript
var gff = require('biojs-io-gff');
gff.hello("biojs"); // "hello biojs"
```

## Documentation

#### .parse(file)

**Parameter**: `file`
**Type**: `String`
**Example**: `SEQ1  EMBL  atg  103  105  .  +  0`

The 'parse' method converts a GFF into its JSON representation.

How to use this method

```javascript
gff.parse('SEQ1  EMBL  atg  103  105  .  +  0');
```

__Result__

```
[ { seqname: 'SEQ1',
    source: 'EMBL',
    feature: 'atg',
    start: '103',
    end: '105',
    score: undefined,
    strand: '+',
    frame: '0',
    attributes: '' } ]
```

## Contributing

Please submit all issues and pull requests to the [greenify/biojs-io-gff](http://github.com/greenify/biojs-io-gff) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/greenify/biojs-io-gff/issues).

## License 


This software is licensed under the Apache 2 license, quoted below.

Copyright (c) 2014, greenify

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
