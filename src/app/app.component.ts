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
    console.log("xjaidjiasdj");
    
    this.locations=[{latitude:12.916412, longitude: 77.611149,draggable:false, name: "Prov India",logo:"http://maps.google.com/mapfiles/ms/icons/red-dot.png" } ];
    this.showLocation=this.locations[0];
  }

  onChoseLocation(event) {
    this.selectedLocation={latitude: event.coords.lat,longitude: event.coords.lng,draggable:false,class:null,name:
       "New Location",logo:"http://maps.google.com/mapfiles/ms/icons/red-dot.png" };
  }

  addMarker(marker){
    this.errorMessage=null;
    if(this.action=="Update"){
          this.locations.map(item=>{
            item.draggable=false;
            item.class=null; })
          this.locations[this.currentIndex].name=this.updateName;http://maps.google.com/mapfiles/ms/icons/red-dot.png
          this.action="Add";
          this.locations[this.currentIndex].logo="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
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
    this.locations[index].logo="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
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

  onMouseOver(infoWindow, gm,loc,index) {
    this.locations[index].logo="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    loc.class="BOUNCE";
    this.showLocation=loc;
    if (gm.lastOpen && gm.lastOpen.isOpen) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
}

  onMouseOut(infoWindow, gm,loc,index) {
      this.locations[index].logo="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      loc.class=null;
      gm.lastOpen.close();
      infoWindow.close();
  }

  markerEnd(index,event){
    this.locations[index].latitude=event.coords.lat;
    this.locations[index].longitude=event.coords.lng;
  }

  btnClick(){

  }
}


interface LocationI{
  latitude?:number;
  longitude?:number;
  draggable?:boolean;
  name?:string;
  class?:string;
  logo ?:string;
}