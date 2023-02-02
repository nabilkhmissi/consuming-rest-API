import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordinate } from 'src/app/models/coordinate.interface';
import { User } from 'src/app/models/User.interface';
import * as Leaflet from 'leaflet';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private userService: userService, private router: Router) { }

  user!: User;
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [29, 41],
    popupAnchor: [1, -34]
  })
  mode: 'edit' | 'locked' = 'locked';
  buttonText: string = 'Edit'

  ngOnInit(): void {
    this.user = (<User>this.activatedRoute.snapshot.data['resolvedResponse'].results[0]);
    this.loadMap(this.user.coordinates)
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save changes' : 'Edit';
    if (mode === 'edit') {
      console.log('saving changes on backend ...')
    }
  }

  private loadMap(coordinates: Coordinate): void {
    const map = Leaflet.map('map', {
      center: [coordinates.latitude, coordinates.longitude],
      zoom: 4
    })
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: 'attribution goes here ...'
    }).addTo(map);
    const marker = Leaflet.marker([coordinates.latitude, coordinates.longitude], { icon: this.marker });
    marker.addTo(map).bindPopup(`${this.user.firstName}'s location`).openPopup();
  }
  goBack() {
    this.router.navigate(['users'])
  }
}
