import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { UserService } from './userservice';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [YoutubeService]
})
export class AppComponent implements OnInit, AfterViewInit {

  accessToken;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private youtube: YoutubeService) {
    gapiService.onLoad().subscribe(()=> {
      if(this.userService.isUserSignedIn()) {
        this.accessToken = this.userService.getToken();
      } else {
        this.userService.signIn();
        if(!this.userService.isUserSignedIn()) alert("Unable to sign-in, plz refresh and try again")
        this.accessToken = this.userService.getToken();
      }
   });
  }

  title = 'yt-player';

  // @ViewChild("ytplayer", { static: false }) divView: ElementRef;

  player;
  // onPlayerReady;
  
  search_key = "Titanic Theme Song"

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('ytplayer', {
        height: '100%',
        width: '100%',
        // videoId: this.getVideo(),
        events: {
          'onReady': (event) => {this.onPlayerReady(event)},
          'onStateChange': (event) => {this.onPlayerStateChange(event)}
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          playlist: 'ALZHF5UqnU4',
          rel: 0,
          showInfo: 0
        }
      });
      // this.cueList()


    };
  }

  ngAfterViewInit() {
    const doc = (<any>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  onPlayerReady(event) {
    event.target.playVideo();
    // event.target.cuePlaylist(["egwGBN6r4DM",'ALZHF5UqnU4','UG3sfZKtCQI'])
    this.youtube.getVideos(this.accessToken, this.search_key).subscribe((data: any) => {
      if(data && data.items) {
        let items = data.items;
        let videoIds = items.map(item => item.id.videoId);
        event.target.cuePlaylist(videoIds)
      }
    });
  }

  onPlayerStateChange(event) {}

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  public signIn() {
    this.userService.signIn();
  }



}
