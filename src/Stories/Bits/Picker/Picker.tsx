import * as React from 'react';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, {
    AutocompleteCloseReason,
    autocompleteClasses,
} from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import { tagData } from 'State/Data';
import { useRecoilValue } from 'recoil';
import { socketRequest } from 'Service/Socket';

interface PopperComponentProps {
    anchorEl?: any;
    disablePortal?: boolean;
    open: boolean;
}

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        fontFamily: 'noto sans !important',
        color: 'inherit',
        fontSize: 14,
        backgroundColor: '#0f0e10 !important',

    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: '#0f0e10',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'center',
            padding: 8,
            margin: '4px 8px',
            borderRadius: '8px',
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',

            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
            {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

function PopperComponent(props: PopperComponentProps) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
    boxShadow: `0 8px 24px rgb(1, 4, 9)`,
    borderRadius: '8px',
    width: 300,
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    backgroundColor: '#0f0e10',
    border: '2px solid #3d4065',

}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid #3d4065`,
    fontFamily: 'noto sans !important',

    '& input': {
        borderRadius: '8px',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid #3d4065`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `0px 0px 0px 3px #3d4065c9`,
            borderColor: '#3d4065',
        },
    },
}));


export default function Picker({ anchorEl, setAnchorEl, current, public_id, type, placement }: any) {


    const tags = useRecoilValue(tagData)
    const [value, setValue]: any = useState([]);
    const [pendingValue, setPendingValue]: any = useState([]);


    const handleSubmit = async () => {

        let strip = []

        for (let i = 0; i < pendingValue.length; i++) {
            strip.push(pendingValue[i].public_id)
        }

        await socketRequest('tag-update', { type: type, tags: strip, public_id: public_id })

    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setPendingValue(value);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setValue(pendingValue);
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;

    return (
        <React.Fragment>




            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement={placement}>
                <ClickAwayListener onClickAway={handleClose}>
                    <div>
                        <Box
                            sx={{
                                borderBottom: `1px solid  '#30363d'`,
                                padding: '8px 10px',
                                fontWeight: 600,
                                fontSize: 14,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>Apply Moderation Tags</div>
                            <Button variant='text' onClick={handleSubmit}>Update</Button>

                        </Box>
                        <Autocomplete
                            open
                            multiple
                            onClose={(
                                event: React.ChangeEvent<{}>,
                                reason: AutocompleteCloseReason,
                            ) => {
                                if (reason === 'escape') {
                                    handleClose();
                                }
                            }}
                            value={pendingValue}
                            onChange={(event, newValue, reason) => {
                                if (
                                    event.type === 'keydown' &&
                                    (event as React.KeyboardEvent).key === 'Backspace' &&
                                    reason === 'removeOption'
                                ) {
                                    return;
                                }
                                setPendingValue(newValue);
                            }}
                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            sx={{
                                paper: {
                                    backgroundColor: '#0f0e10',
                                    root: {
                                        backgroundColor: '#0f0e10',
                                    }
                                }
                            }}
                            renderTags={() => null}
                            noOptionsText="No labels"
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Box
                                        component={DoneIcon}
                                        sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                                        style={{
                                            visibility: selected ? 'visible' : 'hidden',
                                        }}
                                    />
                                    <Box
                                        component="span"
                                        sx={{
                                            width: 14,
                                            height: 14,
                                            flexShrink: 0,
                                            borderRadius: '3px',
                                            mr: 1,
                                            mt: '2px',
                                        }}
                                        style={{
                                            backgroundColor: "#" + option.color?.toString(16),

                                        }}
                                    />
                                    <Box
                                        sx={{
                                            textTransform: 'capitalize',
                                            flexGrow: 1,
                                            '& span': {
                                                color:
                                                    '#8b949e',
                                            },
                                        }}
                                    >
                                        {option.title}
                                    </Box>
                                    <Box
                                        component={CloseIcon}
                                        sx={{ opacity: 0.6, width: 18, height: 18 }}
                                        style={{
                                            visibility: selected ? 'visible' : 'hidden',
                                        }}
                                    />
                                </li>
                            )}
                            options={tags}

                            getOptionLabel={(option) => option.public_id}
                            renderInput={(params) => (
                                <StyledInput
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    autoFocus
                                    placeholder="Filter labels"

                                />
                            )}
                        />
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    );
}

interface LabelType {
    name: string;
    color: string;
    description?: string;
}

// From https://github.com/abdonrd/github-labels
// const labels = [
//     {
//         name: 'good first issue',
//         color: '#7057ff',
//         description: 'Good for newcomers',
//     },
//     {
//         name: 'help wanted',
//         color: '#008672',
//         description: 'Extra attention is needed',
//     },
//     {
//         name: 'priority: critical',
//         color: '#b60205',
//         description: '',
//     },
//     {
//         name: 'priority: high',
//         color: '#d93f0b',
//         description: '',
//     },
//     {
//         name: 'priority: low',
//         color: '#0e8a16',
//         description: '',
//     },
//     {
//         name: 'priority: medium',
//         color: '#fbca04',
//         description: '',
//     },
//     {
//         name: "status: can't reproduce",
//         color: '#fec1c1',
//         description: '',
//     },
//     {
//         name: 'status: confirmed',
//         color: '#215cea',
//         description: '',
//     },
//     {
//         name: 'status: duplicate',
//         color: '#cfd3d7',
//         description: 'This issue or pull request already exists',
//     },
//     {
//         name: 'status: needs information',
//         color: '#fef2c0',
//         description: '',
//     },
//     {
//         name: 'status: wont do/fix',
//         color: '#eeeeee',
//         description: 'This will not be worked on',
//     },
//     {
//         name: 'type: bug',
//         color: '#d73a4a',
//         description: "Something isn't working",
//     },
//     {
//         name: 'type: discussion',
//         color: '#d4c5f9',
//         description: '',
//     },
//     {
//         name: 'type: documentation',
//         color: '#006b75',
//         description: '',
//     },
//     {
//         name: 'type: enhancement',
//         color: '#84b6eb',
//         description: '',
//     },
//     {
//         name: 'type: epic',
//         color: '#3e4b9e',
//         description: 'A theme of work that contain sub-tasks',
//     },
//     {
//         name: 'type: feature request',
//         color: '#fbca04',
//         description: 'New feature or request',
//     },
//     {
//         name: 'type: question',
//         color: '#d876e3',
//         description: 'Further information is requested',
//     },
// ];