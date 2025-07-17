import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    interface RoutingControlOptions extends L.ControlOptions {
      waypoints: L.LatLng[];
      [key: string]: unknown; // Allow additional options like lineOptions
    }
    function control(options: RoutingControlOptions): L.Control;
    function plan(waypoints: L.LatLng[], options?: object): L.Control;
  }
}