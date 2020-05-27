-- Create PostGIS extensions if they don't exist

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Location Table
ALTER TABLE location
ADD geolocation GEOGRAPHY(Point);
