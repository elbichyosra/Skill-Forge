import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useSelector } from "react-redux";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CompletionRateBar = () => {
    const [trainingContents, setTrainingContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchTrainingContents = async () => {
            if(token){ 
                try {
                    const response = await axios.get('http://localhost:5000/dashboard/completionRate', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setTrainingContents(response.data);
                } catch (err) {
                    setError("Erreur lors de la récupération des contenus de formation.");
                    console.error("Erreur lors de la récupération des contenus de formation:", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchTrainingContents();
    }, [token]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    // Préparer les données pour le graphique
    const labels = trainingContents.map(content => content.title);
    const data = trainingContents.map(content => Math.round(content.completionRate)); // Assurez-vous que les taux sont arrondis

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Taux de complétion (%)',
            data: data,
            backgroundColor: 'rgba(33, 158, 138, 0.9)', // Couleur de fond des barres
            borderColor: '#F73A0B', // Couleur de la bordure des barres
            borderWidth: 0,
            barThickness: 'flex', // Épaisseur des barres
            minBarLength: 10,
            barPercentage: 0.3, // Largeur des barres par rapport à l'espace disponible
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    // label: function(context) {
                    //     const label = context.label || '';
                    //     const value = context.raw;
                    //     return `${label}: ${value}%`;
                    // },
                    title: function(context) {
                        if (context.length > 0) {
                            // Le premier élément contient les informations sur le titre
                            return [trainingContents[context[0].dataIndex].title];
                        }
                        return [];
                    }
                },
                mode: "index",
                intersect: false,
                titleFontColor: "#000", // Couleur du texte du titre du tooltip
                bodyFontColor: "#000", // Couleur du texte du corps du tooltip
                titleFontSize: 12,
                bodyFontSize: 15,
                backgroundColor: "#c8c8c8", // Couleur de fond du tooltip
                displayColors: true,
                xPadding: 10,
                yPadding: 7,
                borderColor: "rgba(220, 220, 220, 1)",
                borderWidth: 1,
                caretSize: 6,
                caretPadding: 10
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    zeroLineColor: "transparent"
                },
                ticks: {
                    fontColor: "#6E6E6E",
                    fontFamily: "Nunito, sans-serif"
                }
            },
            y: {
                grid: {
                    color: "rgba(255,255,255,0.2)",
                    drawBorder: true
                },
                ticks: {
                    fontColor: "#6E6E6E",
                    max: 100, // Ajustez selon les valeurs de vos données
                    min: 0,
                    stepSize: 20
                }
            }
        }
    };

    return (
        <div style={{ minHeight: "200px", height: "200px", width: "100%" }}>
            <Bar
                data={chartData}
                options={options}
            />
        </div>
    );
};

export default CompletionRateBar;
