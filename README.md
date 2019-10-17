# YtPlayer

This project was generated to help a friend in need :P
It displays youtube video via iframe embedding. On start it will ask for google authentication. Once it receives the permission it fetches few videos by using Youtube Data API V3 and a keyword.

The search keyword can be configured from ```app.component.ts```:

```  
search_key = "<Enter the search key here>"
```

# Requirements

1. Need to fill-up "client-id" in ```app.module.ts```:

    ```
    let gapiClientConfig: NgGapiClientConfig = {
    client_id: "<Enter your client id obtained from google console>",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/youtube.force-ssl",
        "https://www.googleapis.com/auth/youtube.readonly"
    ].join(" ")
    };
    ```

2. Need to fill-up API key in ```youtube.service.ts```:

    ```
    const Youtube_data_api_key = "<Enter the API key obtained from google console>";
    ```

## Disclaimer
This project is just for demonstartion purpose made in haste.