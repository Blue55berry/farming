import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // keys for translation will go here
          dashboard: {
            welcome: 'Welcome, {{name}}!',
            lastLogin: 'Last login: {{date}}',
            coins: 'Coins',
            saved: 'Saved Items',
            tabs: {
              progress: 'Progress',
              saved: 'Saved Content',
              achievements: 'Achievements',
              leaderboard: 'Leaderboard',
              coinHistory: 'Coin History',
              userCrops: 'My Crops'
            },
            achievements: {
              title: 'Your Achievements',
              earned: 'Earned'
            }
          },
          leaderboard: {
            title: 'Top Farmers Leaderboard',
            rank: 'Rank',
            name: 'Name',
            coins: 'Coins',
            fetchError: 'Failed to load leaderboard. Please try again later.',
            noData: 'No leaderboard data available yet.'
          },
          coinHistory: {
            title: 'Coin Transaction History',
            date: 'Date',
            time: 'Heure',
            time: 'Time',
            source: 'Source',
            amount: 'Amount',
            noHistory: 'No coin transaction history available.'
          },
          userCrops: {
            title: 'My Crops',
            addCrop: 'Add a New Crop',
            selectCrop: 'Select a crop',
            selectCropPrompt: 'Please select a crop to add.',
            addButton: 'Add Crop',
            myCrops: 'My Current Crops',
            noCrops: 'You have not added any crops yet.',
            fetchError: 'Failed to load your crops. Please try again later.',
            addError: 'Failed to add crop. It might already be added or an error occurred.'
          },
          farm: {
            title: 'My Farm',
            buySeeds: 'Buy Seeds',
            selectSeed: 'Select a seed',
            coins: 'coins',
            yourCoins: 'Your Coins',
            plot: 'Plot',
            planted: 'Planted',
            plantedOn: 'Planted On',
            growing: 'Growing',
            plantSeed: 'Plant Seed',
            selectSeedPrompt: 'Please select a seed to plant.',
            plantSuccess: 'Seed planted successfully!',
            plantError: 'Failed to plant seed.',
            fetchError: 'Failed to load farm data. Please try again later.',
            harvestButton: 'Harvest',
            harvestSuccess: 'Crop harvested successfully!',
            harvestError: 'Failed to harvest crop.',
            harvestErrorGeneric: 'An error occurred while harvesting.',
            inventory: 'Inventory',
            emptyInventory: 'Your inventory is empty.',
            quantity: 'Qty',
            sellPrice: 'Sell Price',
            sellButton: 'Sell',
            sellSuccess: '{{quantity}} {{cropName}}(s) sold successfully!',
            sellError: 'Failed to sell crop.',
            sellErrorGeneric: 'An error occurred while selling.',
            availableSeeds: 'Available Seeds',
            price: 'Price',
            growthPeriod: 'Growth Period',
            days: 'days'
          },
          learning: {
            games: {
              seasonQuiz: {
                loading: 'Loading quiz data...'
              },
              plantMatching: {
                title: 'Plant Matching Game',
                description: 'Match plants with their descriptions.'
              }
            }
          }
        }
      },
      es: {
        translation: {
          dashboard: {
            welcome: '¡Bienvenido, {{name}}!',
            lastLogin: 'Último inicio de sesión: {{date}}',
            coins: 'Monedas',
            saved: 'Elementos Guardados',
            tabs: {
              progress: 'Progreso',
              saved: 'Contenido Guardado',
              achievements: 'Logros',
              leaderboard: 'Clasificación',
              coinHistory: 'Historial de Monedas',
              userCrops: 'Mis Cultivos'
            }
          },
          leaderboard: {
            title: 'Clasificación de Mejores Agricultores',
            rank: 'Posición',
            name: 'Nombre',
            coins: 'Monedas',
            fetchError: 'No se pudo cargar la clasificación. Por favor, inténtalo de nuevo más tarde.',
            noData: 'Aún no hay datos de clasificación disponibles.'
          },
          coinHistory: {
            title: 'Historial de Transacciones de Monedas',
            date: 'Fecha',
            time: 'Hora',
            source: 'Fuente',
            amount: 'Cantidad',
            noHistory: 'No hay historial de transacciones de monedas disponible.'
          },
          userCrops: {
            title: 'Mis Cultivos',
            addCrop: 'Añadir un Nuevo Cultivo',
            selectCrop: 'Seleccionar un cultivo',
            selectCropPrompt: 'Por favor, selecciona un cultivo para añadir.',
            addButton: 'Añadir Cultivo',
            myCrops: 'Mis Cultivos Actuales',
            noCrops: 'Aún no has añadido ningún cultivo.',
            fetchError: 'No se pudieron cargar tus cultivos. Por favor, inténtalo de nuevo más tarde.',
            addError: 'No se pudo añadir el cultivo. Puede que ya esté añadido o que haya ocurrido un error.'
          },
          farm: {
            title: 'Mi Granja',
            buySeeds: 'Comprar Semillas',
            selectSeed: 'Seleccionar una semilla',
            coins: 'monedas',
            yourCoins: 'Tus Monedas',
            plot: 'Parcela',
            planted: 'Plantado',
            plantedOn: 'Plantado el',
            growing: 'Creciendo',
            plantSeed: 'Plantar Semilla',
            selectSeedPrompt: 'Por favor, selecciona una semilla para plantar.',
            plantSuccess: '¡Semilla plantada con éxito!',
            plantError: 'Error al plantar la semilla.',
            plantErrorGeneric: 'Ocurrió un error al plantar.',
            fetchError: 'Error al cargar los datos de la granja. Por favor, inténtalo de nuevo más tarde.',
            harvestButton: 'Cosechar',
            harvestSuccess: '¡Cultivo cosechado con éxito!',
            harvestError: 'Error al cosechar el cultivo.',
            harvestErrorGeneric: 'Ocurrió un error al cosechar.',
            inventory: 'Inventario',
            emptyInventory: 'Tu inventario está vacío.',
            quantity: 'Cant.',
            sellPrice: 'Precio de Venta',
            sellButton: 'Vender',
            sellSuccess: '¡{{quantity}} {{cropName}}(s) vendido(s) con éxito!',
            sellError: 'Error al vender el cultivo.',
            sellErrorGeneric: 'Ocurrió un error al vender.',
            availableSeeds: 'Semillas Disponibles',
            price: 'Precio',
            growthPeriod: 'Período de Crecimiento',
            days: 'días'
          },
          learning: {
            games: {
              seasonQuiz: {
                loading: 'Cargando datos del cuestionario...'
              },
              plantMatching: {
                title: 'Juego de Emparejar Plantas',
                description: 'Empareja plantas con sus descripciones.'
              }
            }
          }
        }
      },
      fr: {
        translation: {
          dashboard: {
            welcome: 'Bienvenue, {{name}} !',
            lastLogin: 'Dernière connexion : {{date}}',
            coins: 'Pièces',
            saved: 'Contenu Enregistré',
            tabs: {
              progress: 'Progrès',
              saved: 'Contenu Enregistré',
              achievements: 'Réalisations',
              leaderboard: 'Classement',
              coinHistory: 'Historique des Pièces',
              userCrops: 'Mes Cultures'
            }
          },
          leaderboard: {
            title: 'Classement des Meilleurs Agriculteurs',
            rank: 'Rang',
            name: 'Nom',
            coins: 'Pièces',
            fetchError: 'Échec du chargement du classement. Veuillez réessayer plus tard.',
            noData: 'Aucune donnée de classement disponible pour le moment.'
          },
          coinHistory: {
            title: 'Historique des Transactions de Pièces',
            date: 'Date',
            time: 'Heure',
            source: 'Source',
            amount: 'Montant',
            noHistory: 'Aucun historique des transactions de pièces disponible.'
          },
          userCrops: {
            title: 'Mes Cultures',
            addCrop: 'Ajouter une Nouvelle Culture',
            selectCrop: 'Sélectionner une culture',
            selectCropPrompt: 'Veuillez sélectionner une culture à ajouter.',
            addButton: 'Ajouter la culture',
            myCrops: 'Mes Cultures Actuelles',
            noCrops: 'Vous n\'avez pas encore ajouté de cultures.',
            fetchError: 'Échec du chargement de vos cultures. Veuillez réessayer plus tard.',
            addError: 'Échec de l\'ajout de la culture. Elle est peut-être déjà ajoutée ou une erreur est survenue.'
          },
          farm: {
            title: 'Ma Ferme',
            buySeeds: 'Acheter des graines',
            selectSeed: 'Sélectionner une graine',
            coins: 'pièces',
            yourCoins: 'Vos Pièces',
            plot: 'Parcelle',
            planted: 'Planté',
            plantedOn: 'Planté le',
            growing: 'En croissance',
            plantSeed: 'Planter la graine',
            selectSeedPrompt: 'Veuillez sélectionner une graine à planter.',
            plantSuccess: 'Graine plantée avec succès !',
            plantError: 'Échec de la plantation de la graine.',
            plantErrorGeneric: 'Une erreur est survenue lors de la plantation.',
            fetchError: 'Échec du chargement des données de la ferme. Veuillez réessayer plus tard.',
            harvestButton: 'Récolter',
            harvestSuccess: 'Culture récoltée avec succès !',
            harvestError: 'Échec de la récolte de la culture.',
            harvestErrorGeneric: 'Une erreur est survenue lors de la récolte.',
            inventory: 'Inventaire',
            emptyInventory: 'Votre inventaire est vide.',
            quantity: 'Qté',
            sellPrice: 'Prix de vente',
            sellButton: 'Vendre',
            sellSuccess: '{{quantity}} {{cropName}}(s) vendu(s) avec succès !',
            sellError: 'Échec de la vente de la culture.',
            sellErrorGeneric: 'Une erreur est survenue lors de la vente.',
            availableSeeds: 'Graines disponibles',
            price: 'Prix',
            growthPeriod: 'Période de croissance',
            days: 'jours'
          },
          learning: {
            games: {
              seasonQuiz: {
                loading: 'Chargement des données du quiz...'
              },
              plantMatching: {
                title: 'Jeu d\'association de plantes',
                description: 'Associez les plantes à leurs descriptions.'
              }
            }
          }
        }
      }
    }
  });

export default i18n;
