import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
 
  title: string = "AGM project";
  lat: number = 12.962875;
  lng: number = 77.749614;
  locations: LocationI[];
  selectedLocation:LocationI;
  showLocation:LocationI;
  action:string="Add";
  updateName:string;
  currentIndex:number;
  myColor:string;
  errorMessage:string;
  constructor() {}

  ngOnInit() {
    this.locations=[{latitude:12.916412, longitude: 77.611149,draggable:false, name: "Prov India" } ];
    this.showLocation=this.locations[0];
  }

  onChoseLocation(event) {
    this.selectedLocation={latitude: event.coords.lat,longitude: event.coords.lng,draggable:false,class:null,name: "New Location" };
  }

  addMarker(marker){
    this.errorMessage=null;
    if(this.action=="Update"){
          this.locations.map(item=>{
            item.draggable=false;
            item.class=null; })
          this.locations[this.currentIndex].name=this.updateName;
          this.action="Add";
    }
   else if(this.selectedLocation!=undefined){
          this.selectedLocation.name=marker;
          this.locations.push(this.selectedLocation);
   }else{
          this.errorMessage="** Please click on map to select location to add";
   }
  }

  onDelete(index){
    this.locations.splice(index,1);
  }

  onEdit(index){

    this.locations.map(item=>{
    item.draggable=false;
    item.class=null;
    })
    this.currentIndex=index;
    this.locations[index].draggable=true;
    this.locations[index].class="BOUNCE";
    this.action="Update";
    this.updateName=this.locations[index].name;
    this.myColor=this.locations[index].class;
 
  }

  onMouseOver(infoWindow, gm,loc) {

    this.showLocation=loc;
    if (gm.lastOpen && gm.lastOpen.isOpen) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
}

  onMouseOut(infoWindow, gm) {
      gm.lastOpen.close();
      infoWindow.close();
  }

  markerEnd(index,event){
    this.locations[index].latitude=event.coords.lat;
    this.locations[index].longitude=event.coords.lng;
  }
}


interface LocationI{
  latitude?:number;
  longitude?:number;
  draggable?:boolean;
  name?:string;
  class?:string;
}