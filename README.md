# divvy-dashboard

![Alt text](images/system_architecture.jpg)


Map Selections

Location Type Options
- City
- Ward
- Community Area
- Neighborhood

City 
- Chicago

Ward 
- GeoJson Data

Community Area
- GeoJson Data

Neighboorhood Map
- GeoJson Data

Station Selection
- Top 10 Start Stations
- Top 10 End Stations
- Top 5 Routes


For example if I select Community -> Lakeview -> Top 5 Routes then I want to see the 5 most popular routes that started at a station in Lakeview

Collections For Flask

Top10_Start_Stations_City
Top10_Start_Stations_Ward
Top10_Start_Stations_Community
Top10_Start_Stations_Neighboorhood

Top10_End_Stations_City
Top10_End_Stations_Ward
Top10_End_Stations_Community
Top10_End_Stations_Neighboorhood

Top5_Routes_City
Top5_Routes_Ward
Top5_Routes_Community
Top5_Routes_Neighboorhood

