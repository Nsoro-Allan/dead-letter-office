# Design
- core.js: scenario data, markup parser, validator, scoring, ranking (pure, tested under Node).
- app.js: rendering, lamp proximity detection, marking, verdict flow.
- index.html: layout and styles. Properties tested: right verdict never scores below wrong; more clues found never lowers score; points stay in bounds.
