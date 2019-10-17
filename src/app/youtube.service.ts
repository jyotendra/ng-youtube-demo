import {Injectable, NgZone} from "@angular/core";
import * as _ from "lodash";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const Youtube_data_api_key = "AIzaSyBvsss6cbdedd";

@Injectable()
export class YoutubeService {

    constructor(private http: HttpClient) {

    }

    getVideos(token: string, keyword: string) {
        return this.http.get(`https://www.googleapis.com/youtube/v3/search`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }),
            params: new HttpParams().set("part", "snippet").set("key", Youtube_data_api_key).set("q", keyword)
        })
    }

}