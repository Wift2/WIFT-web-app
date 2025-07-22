import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Button,
} from '@mui/material';
import { useState } from 'react';
import type { Router } from '@toolpad/core';
import SquareFootageForm from './SquareFootageForm';
import AttendeesForm from './AttendeesForm';

// Local type definitions to match form components
type SquareFootageFormData = {
  length: string;
  width: string;
  height: string;
  screenType: string;
  seatingType: string;
  tableSize: string;
  tableSeats: string;
};

type AttendeesFormData = {
  attendees: string;
  screenType: string;
  seatingType: string;
  tableSize: string;
  tableSeats: string;
};

interface CreateFloorplanDialogProps {
  open: boolean;
  onClose: () => void;
  router: Router;
}

const CreateFloorplanDialog = ({
  open,
  onClose,
  router,
}: CreateFloorplanDialogProps) => {
  const [formType, setFormType] = useState<'squareFootage' | 'attendees'>(
    'squareFootage'
  );

  const [squareFootageForm, setSquareFootageForm] =
    useState<SquareFootageFormData>({
      length: '',
      width: '',
      height: '',
      screenType: 'Front',
      seatingType: 'Full',
      tableSize: '60',
      tableSeats: '6',
    });

  const [attendeesForm, setAttendeesForm] = useState<AttendeesFormData>({
    attendees: '',
    screenType: 'Front',
    seatingType: 'Full',
    tableSize: '60',
    tableSeats: '6',
  });

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: 'squareFootage' | 'attendees'
  ) => {
    setFormType(newValue);
  };

  const isSquareFootageFormValid = () => {
    const isValid =
      squareFootageForm.length.length > 0 &&
      squareFootageForm.width.length > 0 &&
      squareFootageForm.height.length > 0;
    return isValid;
  };

  const isAttendeesFormValid = () => {
    const hasAttendeesValue = attendeesForm.attendees.length > 0;
    const attendeesNumber = Number(attendeesForm.attendees);
    const isValidNumber = !Number.isNaN(attendeesNumber) && attendeesNumber > 0;
    const isValid = hasAttendeesValue && isValidNumber;
    
    return isValid;
  };

  const handleGenerateFloorplan = () => {
    // Create URL parameters from form data
    const params = new URLSearchParams();

    if (formType === 'squareFootage') {
      params.set('type', 'squareFootage');
      params.set('length', squareFootageForm.length);
      params.set('width', squareFootageForm.width);
      params.set('height', squareFootageForm.height);
      params.set('screenType', squareFootageForm.screenType);
      params.set('seatingType', squareFootageForm.seatingType);
      params.set('tableSize', squareFootageForm.tableSize);
      params.set('tableSeats', squareFootageForm.tableSeats);
    } else {
      params.set('type', 'attendees');
      params.set('attendees', attendeesForm.attendees);
      params.set('screenType', attendeesForm.screenType);
      params.set('seatingType', attendeesForm.seatingType);
      params.set('tableSize', attendeesForm.tableSize);
      params.set('tableSeats', attendeesForm.tableSeats);
    }

    const navigateUrl = `/floorplans/create?${params.toString()}`;

    // Debug logging
    // eslint-disable-next-line no-console
    console.log('Navigating to:', navigateUrl);
    // eslint-disable-next-line no-console
    console.log(
      'Form data:',
      formType === 'squareFootage' ? squareFootageForm : attendeesForm
    );

    // Close dialog before navigation
    onClose();

    // Navigate to floorplan creation page with form data
    router.navigate(navigateUrl);
  };

  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        // Prevent closing on backdrop click or escape key
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
        onClose();
      }}
      maxWidth="xs"
      fullWidth
      sx={{ '& .MuiDialog-paper': { maxWidth: '500px' } }}
    >
      <DialogTitle>Create New Floorplan</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Tabs value={formType} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Square Footage" value="squareFootage" />
            <Tab label="Attendees" value="attendees" />
          </Tabs>

          {formType === 'squareFootage' && (
            <SquareFootageForm
              formData={squareFootageForm}
              onFormChange={setSquareFootageForm}
            />
          )}

          {formType === 'attendees' && (
            <AttendeesForm
              formData={attendeesForm}
              onFormChange={setAttendeesForm}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleGenerateFloorplan}
          disabled={
            formType === 'squareFootage'
              ? !isSquareFootageFormValid()
              : !isAttendeesFormValid()
          }
        >
          Generate Floorplan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFloorplanDialog;
