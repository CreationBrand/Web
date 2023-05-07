/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import * as React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled, {
  OptionGroupUnstyledProps,
} from '@mui/base/OptionGroupUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { useRecoilValue } from 'recoil';
import { communityData, communityListData } from 'State/Data';
import Avatar from '../Avatar/Avatar';
import { textNormal } from 'Global/Mixins';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: noto sans, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  max-width: 360px;

  padding: 8px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: #343442;
  border: 2px solid #343442;
  color: #afb8c1;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectUnstyledClasses.focusVisible} {
  //  border-color: ${grey[800]};
  
   outline:'none';
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `

  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: noto sans, sans-serif;


  padding: 8px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background:#181820;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `

  list-style: none;

  border-radius: 8px;
  cursor: default;

  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;


  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    border:2px solid ${grey[600]};
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
  }

  &.${optionUnstyledClasses.highlighted} {
    // background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    // color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    // background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    // color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledGroupRoot = styled('li')`
  list-style: none;
`;

const StyledGroupHeader = styled('span')`
  display: block;
  padding: 15px 0 5px 10px;
  font-size: 12px;
  font-weight: 700;
  font-family: noto sans;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: #b9bbbe;
`;

const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;


  > li {
    padding-left: 20px;
  }
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;


`;

function CustomSelect(props: SelectUnstyledProps<string>) {
  const slots: SelectUnstyledProps<string>['slots'] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} slots={slots} />;
}

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(
  props: OptionGroupUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const slots: OptionGroupUnstyledProps['slots'] = {
    root: StyledGroupRoot,
    label: StyledGroupHeader,
    list: StyledGroupOptions,
    ...props.slots,
  };

  return <OptionGroupUnstyled {...props} ref={ref} slots={slots} />;
});

export default function CommunitySelect({ value, onChange }: any) {

  const communitys = useRecoilValue(communityListData)

  if (!communitys) {
    return <div></div>
  }

  let options: any = []

  var map = new Map();

  communitys.map((i: any) => {
    map.set(i.public_id, <StyledOption value={i.public_id} key={i.public_id}>
      <div css={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '40px',
        padding: '4px',
      }}>
        <Avatar public_id={i.public_id} size={'small'} />
        <div css={textNormal('s')}> {i.title}</div>
      </div>
    </StyledOption >)
  })

  options = Array.from(map.values())


  const onProxy = (e: any, value: any) => {
    onChange(value)
  }


  return (
    <CustomSelect value={value} onChange={onProxy}>
      {options}
    </CustomSelect>
  );
}