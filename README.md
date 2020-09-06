# Performance-measure-backend NODE API

- `GET /` -> hello world endpoint
- `POST /browser-metrics`
  - with body { timestamp: 12314144141, measureValue: 1.0242424, measureName: 'load-time'}
- `GET /browser-metrics`
```json
[
  {
  _id: "5f54c5b15822e613e0aa075f",
  measureName: "ttfb",
  measureData: {
    timestampList: [
      1599397841587,
      1599397872124,
      1599397902629,
      1599397932793,
      1599397962970,
      1599397993936,
      1599398055951,
      1599398087259,
      1599398117914,
      1599398180003,
      ...
    ],
    measureValueList: [
      0.9500000160187483,
      0.9649999847169966,
      0.6099999882280827,
      0.49500001478008926,
      0.8150000066962093,
      0.8350000134669244,
      0.830000004498288,
      0.5649999948218465,
      0.5449999880511314,
      0.8200000156648457,
      0.614999997196719,
      ...
    ]
  },
  createdAt: "2020-09-06T11:19:13.423Z",
  updatedAt: "2020-09-06T13:36:48.665Z",
  __v: 245
  },
  {...},
  {...},
  {...}
]
```