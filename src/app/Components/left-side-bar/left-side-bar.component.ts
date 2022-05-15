import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faScroll, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Playlist } from 'src/app/interfaces/Playlist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {


  //icons
  homeIcon =faHome;
  searchIcon=faSearch;
  artistIcon=faGuitar;
  playlistIcon=faMusic;


  playlist:Playlist[]=[]; 
  constructor(private spotifyService :SpotifyService) { }

  ngOnInit(): void {
  }

  async getPlaylistUser(){
    this.playlist= await this.spotifyService.getPlaylistUser();
  }

  
}
