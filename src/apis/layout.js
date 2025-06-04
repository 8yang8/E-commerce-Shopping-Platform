import httpInstance from "@/utiles/http";

export function getCategoryAPI() {
  return httpInstance.get('/home/category/head')
}