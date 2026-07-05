import concert from "@/assets/concert.jpeg.asset.json";
import amphitheatre from "@/assets/amphitheatre.jpeg.asset.json";
import mandapHills from "@/assets/mandap-hills.jpeg.asset.json";
import pavilionFloral from "@/assets/pavilion-floral.jpeg.asset.json";
import stoneArches from "@/assets/stone-arches.jpeg.asset.json";
import amphiCushions from "@/assets/amphi-cushions.jpeg.asset.json";
import mandapRed from "@/assets/mandap-red.jpeg.asset.json";
import roomSuite from "@/assets/room-suite.jpg";
import pool from "@/assets/pool.jpg";
import dining from "@/assets/dining.jpg";
import gardens from "@/assets/gardens.jpg";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/logo.png";
import filmAsset from "@/assets/amita-film.mp4.asset.json";
import resortMainAsset from "@/assets/resort-main.png.asset.json";

export const IMG = {
  concert: concert.url,
  amphitheatre: amphitheatre.url,
  mandapHills: mandapHills.url,
  pavilionFloral: pavilionFloral.url,
  stoneArches: stoneArches.url,
  amphiCushions: amphiCushions.url,
  mandapRed: mandapRed.url,
  roomSuite,
  pool,
  dining,
  gardens,
  hero,
  logo,
  film: filmAsset.url,
  resortMain: resortMainAsset.url,
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/#story" },
  { label: "Experiences", to: "/#experiences" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Stay", to: "/#stay" },
  { label: "Events", to: "/#events" },
  { label: "Contact", to: "/#contact" },
];

export const STORY = [
  { title: "The Dream", body: "A vision to build a haven amidst nature's beauty.", img: IMG.stoneArches },
  { title: "Crafting Nature", body: "Years of planning, quiet stonework and careful creation.", img: IMG.amphitheatre },
  { title: "Welcoming Guests", body: "Opening our doors to hearts, families and stories.", img: IMG.amphiCushions },
  { title: "Creating Celebrations", body: "Becoming a part of countless once-in-a-lifetime moments.", img: IMG.pavilionFloral },
  { title: "Building Memories", body: "Continuing the legacy for generations still to arrive.", img: IMG.mandapHills },
];

export const WHY = [
  { title: "Nature Surrounded", body: "20 acres of forest, hill and quiet." },
  { title: "Luxury Comfort", body: "Rooms crafted for restful, unhurried mornings." },
  { title: "Destination Weddings", body: "Signature venues designed for once-in-a-lifetime days." },
  { title: "Premium Hospitality", body: "A team that anticipates before you ask." },
  { title: "Fine Dining", body: "Seasonal menus, open-fire kitchens, candlelight." },
  { title: "Memorable Experiences", body: "Nature walks, bonfires, curated ceremonies." },
];

export const EXPERIENCES = [
  { title: "Amphitheatre", desc: "Open-air stage set into the hillside, seating 600.", img: IMG.amphiCushions, capacity: "600 guests" },
  { title: "Wedding Pavilion", desc: "Pillared mandap draped in seasonal blooms.", img: IMG.pavilionFloral, capacity: "300 guests" },
  { title: "Banquet Hall", desc: "Grand indoor hall with high ceilings and warm light.", img: IMG.mandapRed, capacity: "400 guests" },
  { title: "Lush Gardens", desc: "Landscaped lawns for intimate ceremonies.", img: IMG.gardens, capacity: "250 guests" },
  { title: "Luxury Rooms", desc: "Warm interiors, private balconies, valley views.", img: IMG.roomSuite, capacity: "100 keys" },
  { title: "Poolside", desc: "Infinity pool overlooking layered hills.", img: IMG.pool, capacity: "150 guests" },
  { title: "Restaurant", desc: "Multi-cuisine kitchen, open kitchen theatre.", img: IMG.dining, capacity: "180 seats" },
  { title: "Corporate Retreats", desc: "Private conclave spaces for teams and offsites.", img: IMG.stoneArches, capacity: "120 delegates" },
];

export const STATS = [
  { value: 20, suffix: "+", label: "Acres of Natural Beauty" },
  { value: 500, suffix: "+", label: "Celebrations Hosted" },
  { value: 1500, suffix: "+", label: "Happy Guests" },
  { value: 4.9, suffix: "★", label: "Guest Rating", decimals: 1 },
  { value: 100, suffix: "+", label: "Luxury Rooms" },
];

export const JOURNEY = [
  { title: "Discover", body: "Explore our spaces and experiences." },
  { title: "Book", body: "Choose your date and customise." },
  { title: "Arrive", body: "A warm welcome awaits you." },
  { title: "Stay", body: "Relax in comfort surrounded by nature." },
  { title: "Celebrate", body: "Moments that become memories." },
  { title: "Cherish", body: "Memories that last a lifetime." },
];

export const AMENITIES = [
  "Infinity Pool","Multi-Cuisine Restaurant","Spa & Wellness","Ample Parking","Kids Area","Indoor Games","Bonfire Nights","Free Wi-Fi","24×7 Reception",
];

export const NEARBY = [
  { name: "Nature Trail", time: "15 min" },
  { name: "Ancient Temple", time: "12 min" },
  { name: "Waterfall", time: "20 min" },
  { name: "Adventure Park", time: "25 min" },
  { name: "Local Market", time: "10 min" },
];

export const TESTIMONIALS = [
  { name: "Ananya & Rohan", role: "Wedding, March 2026", quote: "Amita Rasa gave us a wedding that felt sacred. Every corner of the property held a memory by the time we left." },
  { name: "The Menon Family", role: "Family retreat", quote: "Three generations, one long weekend. Warm rooms, quieter evenings, and a team that felt like family." },
  { name: "Priya Iyer", role: "Corporate Offsite", quote: "The most calm our leadership team has felt in years. The forest does something no boardroom can." },
  { name: "Vikram Shetty", role: "Anniversary", quote: "Candlelit dinner under the stars. My wife has not stopped talking about it." },
];

export const EVENTS = [
  { day: "25", month: "MAY", title: "Live Music Night", time: "Saturday, 7:00 PM" },
  { day: "08", month: "JUN", title: "Wedding Expo", time: "Saturday, 11:00 AM" },
  { day: "15", month: "JUN", title: "Yoga & Wellness", time: "Sunday, 7:00 AM" },
  { day: "22", month: "JUN", title: "Corporate Retreat Open House", time: "Saturday, 10:00 AM" },
];

export const ROOMS = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    price: 12500,
    capacity: "2 Guests",
    size: "38 sqm",
    amenities: ["King Bed", "Valley View", "Rain Shower", "Complimentary Breakfast"],
    img: IMG.roomSuite,
  },
  {
    id: "cottage",
    name: "Luxury Cottage",
    price: 18500,
    capacity: "3 Guests",
    size: "54 sqm",
    amenities: ["Private Deck", "Forest View", "Outdoor Tub", "Butler Service"],
    img: IMG.stoneArches,
  },
  {
    id: "suite",
    name: "Premium Suite",
    price: 26000,
    capacity: "4 Guests",
    size: "72 sqm",
    amenities: ["Living Room", "Panoramic View", "Fireplace", "Private Dining"],
    img: IMG.pavilionFloral,
  },
];

export const GALLERY: Array<{ img: string; span: string; title: string; desc: string; capacity?: string }> = [
  { img: IMG.stoneArches, span: "md:col-span-2 md:row-span-2", title: "Stone Terraces", desc: "Handcrafted arches, quiet corners of the property." },
  { img: IMG.pavilionFloral, span: "md:col-span-2", title: "Wedding Pavilion", desc: "Draped in seasonal blooms.", capacity: "300 guests" },
  { img: IMG.amphiCushions, span: "", title: "Amphitheatre", desc: "Terraced seating under open sky.", capacity: "600 guests" },
  { img: IMG.mandapRed, span: "", title: "Sacred Mandap", desc: "Ceremony under crimson canopy." },
  { img: IMG.concert, span: "md:col-span-2", title: "Concert Nights", desc: "Live performance at the water stage." },
  { img: IMG.mandapHills, span: "", title: "Mandap by the Hills", desc: "Ceremony in the shadow of the valley." },
  { img: IMG.amphitheatre, span: "md:col-span-2", title: "Open-Air Theatre", desc: "Layered stone seating built into the hillside." },
];