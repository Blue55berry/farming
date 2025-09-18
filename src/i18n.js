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
          learning: {
            games: {
              seasonQuiz: {
                loading: 'Loading quiz data...'
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
            },
            achievements: {
              title: 'Tus Logros',
              earned: 'Obtenido'
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
          learning: {
            games: {
              seasonQuiz: {
                loading: 'Cargando datos del cuestionario...'
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
            },
            achievements: {
              title: 'Vos Réalisations',
              earned: 'Obtenu'
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
          learning: {
            games: {
              seasonQuiz: {
                loading: 'Chargement des données du quiz...'
              }
            }
          }
        }
      }
    }
  });

export default i18n;
