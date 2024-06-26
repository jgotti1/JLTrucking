// Import necessary modules
const express = require("express");
const db = require("../DB/db"); // Import your database connection module

// Create an Express Router instance
const router = express.Router();

// GET all jobs
// GET jobs with optional date range filtering
router.get("/", async (req, res) => {
  const { dateRangeStart, dateRangeStop } = req.query;

  // Base query
  let query = "SELECT * FROM jobruns";
  let params = [];

  // Add date range filter if provided
  if (dateRangeStart && dateRangeStop) {
    query += " WHERE job_date BETWEEN $1 AND $2";
    params = [dateRangeStart, dateRangeStop];
  }

  query += " ORDER BY job_date";
  console.log(query)
  try {
    const jobs = await db.query(query, params);
    res.json(jobs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET job by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await db.query("SELECT * FROM jobruns WHERE id = $1", [id]);
    res.json(job.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new job
router.post('/', async (req, res) => {
  try {
    const {
      job_date,
      job_type,
      truck_id,
      driver_id,
      status,
      starting_mileage,
      ending_mileage,
      po_number,
      pickup_location,
      delivery_location,
      job_pay,
      notes
    } = req.body;

    if (status === "Complete") {
      complete_time = new Date();
    } else {
      complete_time = null;
    }

      

        const newJob = await db.query(
            'INSERT INTO jobruns (job_date, job_type, truck_id, driver_id, status, complete_time, starting_mileage, ending_mileage, po_number, pickup_location, delivery_location, job_pay, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            [job_date, job_type, truck_id, driver_id, status, complete_time, starting_mileage, ending_mileage, po_number, pickup_location, delivery_location, job_pay, notes]
    );
    
    res.json(newJob.rows[0]);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a job
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            job_date,
            job_type,
            truck_id,
            driver_id,
            status,
            starting_mileage,
            ending_mileage,
            po_number,
            pickup_location,
            delivery_location,
            job_pay,
            notes,
            completed_time
      } = req.body;
      

      if (status === "Complete") {
        complete_time = new Date();
      } else {
        complete_time = req.body.completedDate;
      }

   
        const updatedJob = await db.query(
            'UPDATE jobruns SET job_date = $1, job_type = $2, truck_id = $3, driver_id = $4, status = $5, complete_time = $6, starting_mileage = $7, ending_mileage = $8, po_number = $9, pickup_location = $10, delivery_location = $11, job_pay = $12, notes = $13 WHERE id = $14 RETURNING *',
            [job_date, job_type, truck_id, driver_id, status, complete_time, starting_mileage, ending_mileage, po_number, pickup_location, delivery_location, job_pay, notes, id]
        );
        res.json(updatedJob.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a job
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM jobruns WHERE id = $1", [id]);
    res.json({ message: "Job run deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export the router
module.exports = router;
