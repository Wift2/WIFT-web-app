import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Fade,
  Skeleton,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import type { Router } from '@toolpad/core';
import CreateFloorplanDialog from './components/CreateFloorplanDialog';
import GradientTitle from '../../components/GradientTitle';

interface FloorplansPageProps {
  router: Router;
}

const FloorplansPage = ({ router }: FloorplansPageProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for skeleton
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateNew = () => {
    setAnimatingCard(true);
    // Start form transition immediately to sync with card animation
    setTimeout(() => {
      setShowForm(true);
    }, 100);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleBackToCards = () => {
    setShowForm(false);
    setAnimatingCard(false);
  };

  return (
    <Box sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
      {/* Main Cards View */}
      {!showForm && (
        <Fade in={!showForm} timeout={600}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <GradientTitle variant="h2" component="h1">
                Custom Floorplans
              </GradientTitle>
              <Button
                variant="outlined"
                startIcon={<AddIcon color="secondary" />}
                size="large"
                sx={{
                  minWidth: 160,
                  color: 'secondary.main',
                }}
                onClick={handleCreateNew}
              >
                Create New
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Welcome Card */}
              <Box sx={{ p: 3 }}>
                {loading ? (
                  <>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1.25rem', mb: 1 }}
                      width="40%"
                    />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width="80%"
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Welcome to WIFT Floorplan Creator
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Design and create custom floorplans with our intuitive
                      drag-and-drop interface. WIFT will give you the confidence
                      you need to assign and allocate meeting space based on
                      your client's unique needs.
                    </Typography>
                  </>
                )}
              </Box>

              {/* Quick Actions */}
              <Grid
                container
                spacing={3}
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: '428px',
                    height: '110px',
                    position: 'absolute',
                    zIndex: 0,
                    transform: 'translate(22%, 16%)',
                    borderRadius: '428px',
                    opacity: 0.25,
                    background: '#0369a1',
                    filter: 'blur(110px)',
                    top: '53px',
                  },
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: '510px',
                    height: '58px',
                    position: 'absolute',
                    zIndex: 0,
                    transform: 'translate(80%, 28%)',
                    borderRadius: '611px',
                    opacity: 0.3,
                    background: '#11b83a',
                    filter: 'blur(90px)',
                    top: '53px',
                  },
                  '& > *': {
                    position: 'relative',
                    zIndex: 1,
                  },
                }}
              >
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: loading ? 'default' : 'pointer',
                      transform: animatingCard ? 'scale(1.2)' : 'scale(1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: animatingCard ? 10 : 1,
                      borderRadius: '28px',
                      '&:hover': {
                        boxShadow: loading
                          ? '0px 4px 12px rgba(124, 58, 237, 0.08)'
                          : '0px 8px 24px rgba(124, 58, 237, 0.12)',
                        transform: animatingCard
                          ? 'scale(1.2)'
                          : loading
                            ? 'translateY(0)'
                            : 'translateY(-2px) scale(1.02)',
                      },
                    }}
                    onClick={loading ? undefined : handleCreateNew}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      {loading ? (
                        <>
                          <Skeleton
                            variant="circular"
                            width={48}
                            height={48}
                            sx={{ mx: 'auto', mb: 2 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '1.25rem', mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '0.875rem', mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '0.875rem', mb: 2 }}
                          />
                          <Skeleton
                            variant="rectangular"
                            height={36}
                            sx={{ borderRadius: 1 }}
                          />
                        </>
                      ) : (
                        <>
                          <AddIcon
                            sx={{
                              fontSize: 48,
                              color: 'primary.main',
                              mb: 2,
                            }}
                          />
                          <Typography variant="h6" gutterBottom>
                            Create New Floorplan
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            Start from scratch or use our professional templates
                            to design your custom floorplan.
                          </Typography>
                          <Button variant="outlined" fullWidth>
                            Get Started
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: loading ? 'default' : 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '28px',
                      '&:hover': {
                        boxShadow: loading
                          ? '0px 4px 12px rgba(124, 58, 237, 0.08)'
                          : '0px 8px 24px rgba(124, 58, 237, 0.12)',
                        transform: loading
                          ? 'translateY(0)'
                          : 'translateY(-2px) scale(1.02)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      {loading ? (
                        <>
                          <Skeleton
                            variant="circular"
                            width={48}
                            height={48}
                            sx={{ mx: 'auto', mb: 2 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '1.25rem', mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '0.875rem', mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '0.875rem', mb: 2 }}
                          />
                          <Skeleton
                            variant="rectangular"
                            height={36}
                            sx={{ borderRadius: 1 }}
                          />
                        </>
                      ) : (
                        <>
                          <EditIcon
                            sx={{
                              fontSize: 48,
                              color: 'success.main',
                              mb: 2,
                            }}
                          />
                          <Typography variant="h6" gutterBottom>
                            Edit Existing Plans
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            Modify and enhance your saved floorplans with our
                            comprehensive editing tools.
                          </Typography>
                          <Button variant="outlined" fullWidth>
                            Browse Plans
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: loading ? 'default' : 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '28px',
                      '&:hover': {
                        boxShadow: loading
                          ? '0px 4px 12px rgba(124, 58, 237, 0.08)'
                          : '0px 8px 24px rgba(124, 58, 237, 0.12)',
                        transform: loading
                          ? 'translateY(0)'
                          : 'translateY(-2px) scale(1.02)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      {loading ? (
                        <>
                          <Skeleton
                            variant="circular"
                            width={48}
                            height={48}
                            sx={{ mx: 'auto', mb: 2 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '1.25rem', mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '0.875rem', mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: '0.875rem', mb: 2 }}
                          />
                          <Skeleton
                            variant="rectangular"
                            height={36}
                            sx={{ borderRadius: 1 }}
                          />
                        </>
                      ) : (
                        <>
                          <ViewIcon
                            sx={{
                              fontSize: 48,
                              color: '#7C3AED',
                              mb: 2,
                            }}
                          />
                          <Typography variant="h6" gutterBottom>
                            View Gallery
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            Explore our gallery of completed floorplans and get
                            inspiration for your designs.
                          </Typography>
                          <Button variant="outlined" fullWidth>
                            View Gallery
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Features Coming Soon */}
              <Box sx={{ p: 3 }}>
                {loading ? (
                  <>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1.25rem', mb: 2 }}
                      width="30%"
                    />
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '0.875rem' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '0.875rem' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '0.875rem' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '0.875rem' }}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Coming Soon Features
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          • Drag & Drop Designer
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          • 3D Visualization
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          • Collaboration Tools
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          • Export Options
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      )}

      {/* Animated Form View */}
      {showForm && (
        <Fade in={showForm} timeout={600}>
          <Box
            sx={{
              transform: showForm
                ? 'scale(1) translate(0, 0)'
                : 'scale(1.2) translate(-50%, -200px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transformOrigin: 'center',
              position: showForm ? 'static' : 'absolute',
              left: showForm ? 'auto' : '33.33%',
              top: showForm ? 'auto' : '200px',
              width: showForm ? '100%' : '300px',
            }}
          >
            <Box
              sx={{
                p: 3,
                transform: showForm ? 'scale(1)' : 'scale(0.9)',
                transition:
                  'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                transformOrigin: 'center',
              }}
            >
              <CreateFloorplanDialog
                open={true}
                onClose={handleBackToCards}
                router={router}
              />
            </Box>
          </Box>
        </Fade>
      )}

      {/* Keep original dialog for fallback */}
      <CreateFloorplanDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        router={router}
      />
    </Box>
  );
};

export default FloorplansPage;
