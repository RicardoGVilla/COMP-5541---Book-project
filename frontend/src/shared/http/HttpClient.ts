import Verb from "./verb";
import Endpoints from "../api/endpoints";
import {
    ApolloClient as ApolloClientBase,
    InMemoryCache,
} from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/naming-convention
let HttpClient: () => HttpClientBase;
(function() {
    // Creating a singleton instance of an HTTP client
    let instance : HttpClientBase;
    HttpClient = function HttpClient(): HttpClientBase {
        if(instance !== undefined) {
            return instance;
        }
        instance = new HttpClientBase();
        return instance;
    }
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HttpReponse = Promise<Record <string,any>>

// Base class for managing HTTP requests
class HttpClientBase {
    baseUrl = 'http://localhost:8080/';
    mode: "cors" | "navigate" | "no-cors" | "same-origin" | undefined = "cors";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers: any = {
         // eslint-disable-next-line @typescript-eslint/naming-convention
        "Authorization": null,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-Type": "application/json",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Access-Control-Allow-Origin": "*",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(url: string): any {
        if (this.headers["Authorization"] === null) {
            window.location.replace("http://localhost:3000/sign-in");
        }
        const requestOptions = {
            method:Verb.GET,
            headers: this.headers,
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            });
    }

    post(url: string, param: string): Promise<Response> {
        if (this.headers["Authorization"] === null) {
            window.location.replace("http://localhost:3000/sign-in");
        }
        const requestOptions = {
            method:Verb.POST,
            headers: this.headers,
        };
        return fetch(url + "/" + param, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            });
    }

    getHeaders() {
        if (this.headers["Authorization"] === null) {
            window.location.replace("http://localhost:3000/sign-in");
        } else {
            return this.headers;
        }
    }

    login(email: string, password: string):HttpReponse {
        const requestOptions = {
            url: this.baseUrl,
            method: Verb.POST,
            mode: this.mode,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Accept": 'application/json',
                 // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'application/json',
                 // eslint-disable-next-line @typescript-eslint/naming-convention
                "Access-Control-Allow-Origin": "*"
                // eslint-disable-next-line @typescript-eslint/naming-convention
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        };
        return fetch(this.baseUrl + Endpoints.login, requestOptions)
        .then(response => {
            const headers = response.headers;
            this.headers['Authorization'] = headers.get('Authorization');
            return response;
        });
    }

    deleteAccount(password: string): HttpReponse {
        const mode: 'cors' | undefined = 'cors';
        const requestOptions = {
            method: Verb.DELETE,
            mode:mode,
            headers: this.headers,
            body: JSON.stringify({
                password: password
            })
        };
        return fetch(this.baseUrl + Endpoints.user, requestOptions)
        .then(response => {
            if (response.ok) {
                this.headers['Authorization'] = null;
            }
            return response;
        });
    }
}

const httpClientInstance = HttpClient();
export const apolloClient = new ApolloClientBase({
    uri: 'http://localhost:8082/graphql',
    cache: new InMemoryCache(),
    headers:httpClientInstance.headers
});

export default httpClientInstance;

