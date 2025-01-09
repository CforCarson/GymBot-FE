// src/components/WorkoutPlanner/WorkoutPlannerForm.js

import React, { useState } from 'react';
import axios from 'axios';

const WorkoutPlannerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '1',
    activity_level: '1',
    workout_type: '1',
    experience_level: '1',
    equipment: '1',
    time_available: '',
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [adjustForm, setAdjustForm] = useState({
    daily_diet: '',
    daily_sleep: '',
    injuries: '',
    stress_level: ''
  });

  const [adjustedPlan, setAdjustedPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios.post('http://localhost:8000/generate_workout_plan', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setLoading(false);
        console.log('DEBUG front-end response:', response.data);

        if (response.data.error) {
          // Server responded with an error message
          setError(response.data.error);
          setWorkoutPlan(null);
        } else {
          // The server returned the workout plan successfully
          setWorkoutPlan(response.data.plan);
          setError(null);
        }
      })
      .catch((error) => {
        setLoading(false);
        // Handle network errors, etc.
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred. Please try again.');
        }
        setWorkoutPlan(null);
      });
  };

  const handleAdjustFormChange = (e) => {
    setAdjustForm({
      ...adjustForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAdjustPlan = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('daily_diet', adjustForm.daily_diet);
    data.append('daily_sleep', adjustForm.daily_sleep);
    data.append('injuries', adjustForm.injuries);
    data.append('stress_level', adjustForm.stress_level);

    axios.post('http://localhost:8000/adjust_workout_plan', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      setAdjustedPlan(response.data.adjusted_plan);
      setError(null);
    })
    .catch((error) => {
      console.error(error);
      setError('Error adjusting plan. Please try again.');
    });
  };

  return (
    <div>
      {(() => {
        if (!workoutPlan && !loading) {
          return (
            <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: '500px' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Name:</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Age:</label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Gender (M/F):</label>
                <input
                  type="text"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="M or F"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Height (cm):</label>
                <input
                  type="number"
                  name="height"
                  required
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g. 175"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  required
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 70"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Fitness Goal:</label>
                <select
                  name="goal"
                  required
                  value={formData.goal}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="1">Weight Loss</option>
                  <option value="2">Muscle Gain</option>
                  <option value="3">Maintenance</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Activity Level:</label>
                <select
                  name="activity_level"
                  required
                  value={formData.activity_level}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="1">Sedentary</option>
                  <option value="2">Light Activity</option>
                  <option value="3">Moderate Activity</option>
                  <option value="4">Active</option>
                  <option value="5">Very Active</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Preferred Workout Type:</label>
                <select
                  name="workout_type"
                  required
                  value={formData.workout_type}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="1">Cardio</option>
                  <option value="2">Strength Training</option>
                  <option value="3">Flexibility</option>
                  <option value="4">HIIT</option>
                  <option value="5">Mixed</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Experience Level:</label>
                <select
                  name="experience_level"
                  required
                  value={formData.experience_level}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="1">Beginner</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Advanced</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Available Equipment:</label>
                <select
                  name="equipment"
                  required
                  value={formData.equipment}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="1">No Equipment</option>
                  <option value="2">Basic Equipment</option>
                  <option value="3">Full Gym Access</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Time Available (minutes):</label>
                <input
                  type="number"
                  name="time_available"
                  required
                  value={formData.time_available}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <button type="submit" style={{ padding: '0.8rem 1.2rem' }}>Generate Workout Plan</button>
            </form>
          );
        }

        if (loading) {
          return <p>Loading...</p>;
        }

        return (
          <div style={{ marginTop: '1rem' }}>
            <h1>Your Workout Plan</h1>
            <div
              className="workout-plan-container"
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}
            >
              {Object.entries(workoutPlan).map(([day, exercises]) => (
                <div key={day} style={{ marginBottom: '1rem' }}>
                  <h2 style={{ marginBottom: '0.5rem' }}>{day}</h2>
                  <ul style={{ paddingLeft: '1.2rem' }}>
                    {exercises.map((ex, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>
                        {typeof ex === 'object'
                          ? (
                              Object.entries(ex).map(([key, value]) => (
                                <div key={key}>{key}: {value}</div>
                              ))
                            )
                          : ex
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button onClick={() => {
              setWorkoutPlan(null);
              setAdjustedPlan(null);
            }} style={{ marginTop: '1rem' }}>
              Go Back
            </button>

            {workoutPlan && !loading && (
              <>
                <form onSubmit={handleAdjustPlan} style={{ marginTop: '1rem' }}>
                  <h2>Adjust Your Plan</h2>

                  <label style={{ display: 'block', fontWeight: 'bold' }}>Daily Diet:</label>
                  <input
                    type="text"
                    name="daily_diet"
                    value={adjustForm.daily_diet}
                    onChange={handleAdjustFormChange}
                    placeholder="e.g. High protein, moderate carbs..."
                    style={{ width: '100%', padding: '0.5rem' }}
                  />

                  <label style={{ display: 'block', fontWeight: 'bold' }}>Daily Sleep (hours):</label>
                  <input
                    type="number"
                    name="daily_sleep"
                    value={adjustForm.daily_sleep}
                    onChange={handleAdjustFormChange}
                    placeholder="e.g. 7"
                    style={{ width: '100%', padding: '0.5rem' }}
                  />

                  <label style={{ display: 'block', fontWeight: 'bold' }}>Injuries:</label>
                  <input
                    type="text"
                    name="injuries"
                    value={adjustForm.injuries}
                    onChange={handleAdjustFormChange}
                    placeholder="e.g. Knee pain"
                  />

                  <label style={{ display: 'block', fontWeight: 'bold' }}>Stress Level:</label>
                  <input
                    type="text"
                    name="stress_level"
                    value={adjustForm.stress_level}
                    onChange={handleAdjustFormChange}
                    placeholder="e.g. High or Low"
                  />

                  <button type="submit" style={{ marginTop: '1rem', padding: '0.8rem 1.2rem' }}>
                    Adjust Plan
                  </button>
                </form>
              </>
            )}

            {adjustedPlan && (
              <div
                className="workout-plan-container"
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginTop: '1rem'
                }}
              >
                <h2>Adjusted Plan</h2>
                {Object.entries(adjustedPlan).map(([day, exercises]) => (
                  <div key={day} style={{ marginBottom: '1rem' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{day}</h3>
                    <ul style={{ paddingLeft: '1.2rem' }}>
                      {exercises.map((ex, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>
                          {typeof ex === 'object'
                            ? (
                                Object.entries(ex).map(([key, value]) => (
                                  <div key={key}>{key}: {value}</div>
                                ))
                              )
                            : ex
                          }
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default WorkoutPlannerForm;