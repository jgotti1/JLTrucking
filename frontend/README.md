# JL Trucking Industries App

## Introduction
The JL Trucking Industries App is designed to streamline operations for trucking companies by tracking fuel usage, maintenance, and daily job runs. Built with a React frontend, Express and Node.js backend, and a PostgreSQL database, this app ensures efficient management and oversight of critical logistical data.

## Features

### Fuel Usage Tracking
Tracks the company's fuel consumption details, including:
- **Fuel Date**: The date on which the fuel was purchased.
- **Truck ID**: Identifier for the truck.
- **Fuel Gallons**: Amount of fuel purchased, in gallons.
- **Fuel Cost**: Total cost of the fuel purchased.
- **Per Gallon Cost**: Cost per gallon of fuel.
- **Mileage**: Mileage of the truck at the time of fuel purchase.

### Truck Maintenance Tracking
Manages maintenance records for each truck, capturing:
- **Maintenance Date**: The date on which maintenance was performed.
- **Truck ID**: Identifier for the truck.
- **Maintenance Type**: Type of maintenance performed.
- **Maintenance Cost**: Cost associated with the maintenance.
- **Maintenance Mileage**: Truck mileage at the time of maintenance.
- **Notes**: Additional notes regarding the maintenance.

### Daily Job Runs and Cost/Payment Tracking
Keeps track of daily job assignments and related financial details, including:
- **Job Date**: The date of the job.
- **Job Type**: Type of job performed.
- **Truck ID**: Identifier for the truck.
- **Driver ID**: Identifier for the driver.
- **Status**: Current status of the job.
- **Complete Time**: Time at which the job was completed.
- **Starting Mileage**: Mileage of the truck at the start of the job.
- **Ending Mileage**: Mileage of the truck at the end of the job.
- **PO Number**: Purchase order number.
- **Pickup Location**: Location where cargo or load was picked up.
- **Delivery Location**: Location where cargo or load was delivered.
- **Job Pay**: Payment received for the job.
- **Notes**: Additional notes regarding the job.

## Technology Stack
- **Frontend**: React
- **Backend**: Express, Node.js
- **Database**: PostgreSQL

This app is committed to enhancing the efficiency and transparency of trucking operations, helping JL Trucking Industries LLC manage their resources more effectively.
